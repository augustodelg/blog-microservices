import { useMemo, useState } from "react";

const useFilter = (
    data,
    searchFunction
) => {
    const [search, setSearch] = useState('');
    return [useMemo(() => {
        const regex = new RegExp(search, "i");
        return Array.isArray(data) ? data.filter((item) => searchFunction(item).some((sp) => regex.test(sp))) : [];
    }, [data, search, searchFunction]), search, setSearch];
};

export default useFilter;