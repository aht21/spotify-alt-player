import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchLibraryContains,
  fetchLibraryRemove,
  fetchLibrarySave,
} from "../../services/api/library.ts";
import plusIcon from "../../assets/icons/plus_circle.svg";
import SaveMarkerIcon from "../saveMarkerIcon";
import styles from "./saveMarker.module.css";

interface Props {
  uri: string;
}

const SaveMarker = ({ uri }: Props) => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["track-save", uri],
    queryFn: () => {
      return fetchLibraryContains(uri);
    },
  });

  // optimistic save
  const saveMutation = useMutation({
    mutationFn: () => fetchLibrarySave(uri),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["track-save", uri],
      });

      const previous = queryClient.getQueryData<boolean[]>(["track-saved", uri]);

      queryClient.setQueryData(["track-save", uri], [true]);

      return { previous };
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["track-save", uri], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["track-save", uri],
      });
    },
  });

  // optimistic remove
  const removeMutation = useMutation({
    mutationFn: () => fetchLibraryRemove(uri),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["track-save", uri],
      });

      const previous = queryClient.getQueryData<boolean[]>(["track-saved", uri]);

      queryClient.setQueryData(["track-save", uri], [false]);

      return { previous };
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["track-save", uri], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["track-save", uri],
      });
    },
  });

  const onSaveRemove = () => {
    if (data === undefined || data.length === 0) return;

    if (data[0]) {
      removeMutation.mutate();
    } else {
      saveMutation.mutate();
    }
  };

  if (isPending)
    return (
      <button className={styles.save_button} disabled={true}>
        <img src={plusIcon} alt="" className={styles.save_image} />
      </button>
    );

  if (error || data?.length === 0) {
    console.error(error);
    return;
  }

  return (
    <button
      className={styles.save_button}
      onClick={onSaveRemove}
      disabled={saveMutation.isPending || removeMutation.isPending}
    >
      {data[0] ? (
        <SaveMarkerIcon height="1.6rem" width="1.6rem" />
      ) : (
        <img src={plusIcon} alt="" className={styles.save_image} />
      )}
    </button>
  );
};

export default SaveMarker;
