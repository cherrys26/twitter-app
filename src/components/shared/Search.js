import React, { useState } from 'react';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';

export default function AsyncExample() {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = (query) => {
        setIsLoading(true);

        axios.get(`${BASE_API_URL}users?username=${query}`)
            .then(({ data }) => {
                const options = data.map((i) => ({
                    username: i.username
                }));

                setOptions(options);
                setIsLoading(false);
            });

    };

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey="username"
            minLength={2}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for a Github user..."
            renderMenuItemChildren={(option, props) => (
                <div>

                    <span>{option.username}</span>
                </div>
            )}
        />
    );
};