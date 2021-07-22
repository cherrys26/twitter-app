import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { BASE_API_URL } from '../../utils/constants';
import axios from 'axios';
import '../../App.css'

export default function SearchSwitter() {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = (query) => {
        setIsLoading(false);

        axios.get(`${BASE_API_URL}users?username=${query}`)
            .then(({ data }) => {
                const options = data.map((i) => ({
                    username: i.username,
                    name: i.name
                }));

                setOptions(options);
                setIsLoading(false);
            });

    };

    const filterBy = () => true;

    return (
        <Form>
            <AsyncTypeahead
                filterBy={filterBy}
                id="searchBar"
                className="searchBar"
                isLoading={isLoading}
                labelKey="username"
                minLength={2}
                onChange={handleSearch}
                options={options}
                placeholder="Search Switter"
                renderMenuItemChildren={(option, props) => (
                    <Link to={option.username}>
                        <div >
                            <span style={{ color: "white" }}>{option.name}</span>
                            <br />
                            <span style={{ color: "grey", fontSize: "14px" }}>@{option.username}</span>
                        </div>
                    </Link>
                )}
            />
            <button type="submit">search?</button>
        </Form>
    );
};