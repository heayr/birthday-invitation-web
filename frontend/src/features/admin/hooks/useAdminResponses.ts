// frontend/src/features/admin/hooks/useAdminResponses.ts
import { useState, useEffect, useCallback } from 'react';
import { adminApi, type AdminRsvp, type AdminResponsesResponse } from '../../../lib/api';

export const useAdminResponses = () => {
    const [responses, setResponses] = useState<AdminRsvp[]>([]);
    const [pagination, setPagination] = useState<AdminResponsesResponse['pagination'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState({
        page: 1,
        limit: 15,
        search: '',
        attending: undefined as boolean | undefined,
    });

    const fetchResponses = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await adminApi.getResponses(filters);
            setResponses(result.data);
            setPagination(result.pagination);
        } catch (err: any) {
            setError(err.message || 'Не удалось загрузить ответы');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchResponses();
    }, [fetchResponses]);

    const updateFilters = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
    };

    const changePage = (newPage: number) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };

    return {
        responses,
        pagination,
        loading,
        error,
        filters,
        updateFilters,
        changePage,
        refetch: fetchResponses,
    };
};