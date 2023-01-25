import { useCallback, useEffect, useMemo, useState } from 'react';
import { hasPrime } from '../../utils';
import { API_URL } from './consts';
import { Response, User } from './model';

const SEED_ID = 'prohuman';
const RESULTS_SIZE = 200;

const query = new URLSearchParams({
  seed: SEED_ID,
  results: String(RESULTS_SIZE),
}).toString();

const useFetchUsers = () => {
  const [response, setResponse] = useState<Response>({ results: [] });

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await fetch(`${API_URL}?${query}`);
      setResponse((await result.json()) as Response);
    };

    fetchUsers();
  }, []);

  const { results: users } = response;

  const filteredUsers = useMemo(
    () => users.filter((user) => hasPrime(user.location.postcode)),
    [users],
  );

  return useCallback(
    async (page: number, pageSize: number) => {
      return {
        users: filteredUsers.slice((page - 1) * pageSize, page * pageSize),
        totalCount: filteredUsers.length,
      };
    },
    [filteredUsers],
  );
};

interface UseFetchUsersProps {
  page: number;
  pageSize?: number;
}

export const useQueryUsers = ({ page, pageSize = 10 }: UseFetchUsersProps) => {
  const fetchUsers = useFetchUsers();
  const [recordCount, setRecordCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers(page, pageSize).then(({ users, totalCount }) => {
      setRecordCount(totalCount);
      setUsers(users);
    });
  }, [page, fetchUsers]);

  return useMemo(
    () => ({
      users,
      info: {
        recordCount,
      },
    }),
    [users],
  );
};
