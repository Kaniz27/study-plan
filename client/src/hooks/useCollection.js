import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../services/api';

export function useCollection(path, label) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(path).then(({ data }) => setItems(data.items)).catch(() => toast.error(`Could not load your ${label}`)).finally(() => setLoading(false));
  }, [path, label]);
  const save = async (values, id) => {
    const { data } = id ? await api.put(`${path}/${id}`, values) : await api.post(path, values);
    setItems((current) => id ? current.map((item) => item._id === id ? data.item : item) : [data.item, ...current]);
    return data.item;
  };
  const remove = async (id) => { await api.delete(`${path}/${id}`); setItems((current) => current.filter((item) => item._id !== id)); };
  return { items, loading, save, remove };
}
