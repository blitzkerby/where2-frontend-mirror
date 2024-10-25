import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash, Eye } from "lucide-react";
import deleteUser from "./DeleteUser";

export const useUserFunctions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleDelete = async (id) => {
    await mutation.mutateAsync(id);
  };

  const handleView = (id) => {
    navigate(`/user/${id}`);
  };

  const userActions = [
    {
      variant: "danger",
      icon: <Trash />,
      onClick: handleDelete,
      requiresConfirmation: true,
    },
    {
      variant: "ghost",
      icon: null,
      label: "View",
      onClick: handleView,
    },
  ];

  return { userActions, handleDelete, handleView };
};