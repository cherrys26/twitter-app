import React, { useState } from 'react';

const List = () => {
    const [listItems, setListItems] = useState(Array.from(Array(30).keys(), n => n + 1));

    return (
        <>
            <ul className="list-group mb-2">
                {listItems.map(listItem => <li className="list-group-item">List Item {listItem}</li>)}
            </ul>
        </>
    );
};

export default List;