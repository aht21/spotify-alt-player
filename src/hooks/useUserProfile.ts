import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../services/api/user";
import type { UserProfile } from "../types/user";

const useUserProfile = <T = UserProfile>(select?: (data: UserProfile) => T) => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
    select,
  });
};

export default useUserProfile;
