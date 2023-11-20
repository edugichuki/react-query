/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`htttp://localhost:4000/users/${email}`);
};

const fetchStackByChannelId = (channelId) => {
  return axios.get(`htttp://localhost:4000/users/${channelId}`);
};

export const DependentQueries = ({ email }) => {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
  });

  const channelId = user?.data.channelId;

  useQuery({
    queryKey: ["stack", channelId],
    queryFn: () => fetchStackByChannelId(channelId),
    //? The query will not execute until the userId exists
    enabled: !!channelId,
  });
  return <div>DependentQueries</div>;
};
