import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PlaybackState } from "../../../types/player.ts";

/**
 * Mutation with optimistic replay state update:
 * immediately commits the change to the cache, rolls back if necessary,
 * rechecks the state after the request is completed.
 */
export function useOptimisticPlaybackMutation<TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<unknown>,
  toOptimisticState: (variables: TVariables) => Partial<PlaybackState>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables: TVariables) => {
      await queryClient.cancelQueries({ queryKey: ["playback-state"] });

      const previous = queryClient.getQueryData<PlaybackState>(["playback-state"]);

      queryClient.setQueryData(["playback-state"], (old: PlaybackState) => ({
        ...old,
        ...toOptimisticState(variables),
      }));

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["playback-state"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["playback-state"] });
    },
  });
}
