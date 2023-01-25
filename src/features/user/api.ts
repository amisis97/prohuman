import { useCallback, useEffect, useMemo, useState } from 'react';
import { hasPrime } from '../../utils';
import { API_URL } from './consts';
import { Response, User } from './model';

const RESULTS_SIZE = 200;

const initialQuery = {
  results: String(RESULTS_SIZE),
};

const useFetchUsers = (gender?: string) => {
  const [response, setResponse] = useState<Response>({ results: [] });

  const queryString = useMemo(() => {
    if (gender) {
      return new URLSearchParams({ ...initialQuery, gender });
    }

    return new URLSearchParams(initialQuery);
  }, [gender]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await fetch(`${API_URL}?${queryString}`);
      setResponse((await result.json()) as Response);
    };

    fetchUsers();
  }, [queryString]);

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
  gender?: string;
}

export const useQueryUsers = ({ page, pageSize = 10, gender }: UseFetchUsersProps) => {
  const fetchUsers = useFetchUsers(gender);
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
