import { useEffect, useMemo, useState } from 'react';
import { hasPrime } from '../../utils';
import { API_URL } from './consts';
import { Response, User } from './model';

const SEED_ID = 'prohuman';

const fetchUsers = async (page: number, results: number) => {
  const query = new URLSearchParams({
    seed: SEED_ID,
    results: String(results),
  }).toString();

  const result = await fetch(`${API_URL}?${query}`);
  const { results: users } = (await result.json()) as Response;

  return users.filter((user) => hasPrime(user.location.postcode)).slice((page - 1) * 10, page * 10);
};

interface UseFetchUsersProps {
  page: number;
}

export const useFetchUsers = ({ page }: UseFetchUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers(page, 200).then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, [page]);

  return useMemo(() => ({ users, isLoading }), [users, isLoading]);
};
