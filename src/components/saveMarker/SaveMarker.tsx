import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchLibraryContains,
  fetchLibraryRemove,
  fetchLibrarySave,
} from "../../services/api/library.ts";
import checkIcon from "../../assets/icons/check_circle_solid.svg";
import plusIcon from "../../assets/icons/plus_circle.svg";
import styles from "./saveMarker.module.css";

interface Props {
  uri: string;
}

const SaveMarker = ({ uri }: Props) => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["track-saved", uri],
    queryFn: () => {
      return fetchLibraryContains(uri);
    },
  });

  const saveMutation = useMutation({
    mutationFn: () => fetchLibrarySave(uri),
    onSuccess: () => {
      queryClient.setQueryData(["track-saved", uri], [true]);
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => fetchLibraryRemove(uri),
    onSuccess: () => {
      queryClient.setQueryData(["track-saved", uri], [false]);
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

  if (isPending) return <div>Загрузка...</div>;

  if (error || data?.length === 0) return <div>Ошибка</div>;

  return (
    <button
      className={styles.save_button}
      onClick={onSaveRemove}
      disabled={saveMutation.isPending || removeMutation.isPending}
    >
      {data[0] ? (
        <img src={checkIcon} alt="" className={styles.saved_image} />
      ) : (
        <img src={plusIcon} alt="" className={styles.save_image} />
      )}
    </button>
  );
};

export default SaveMarker;
