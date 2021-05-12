import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Progress({ location: { pathname } }) {
    const isFirstStep = pathname === '/signup1';
    const isSecondStep = pathname === '/signup2';
    const isThirdStep = pathname === '/signup3';

    return (
        <React.Fragment>
            {isFirstStep || isSecondStep || isThirdStep ? (
                <div className="steps">
                    <div className={`${isFirstStep ? 'step active' : 'step'}`}>
                        <div>1</div>
                        <div>
                            {isSecondStep || isThirdStep ? (
                                <Link to="/signup1">Step 1</Link>
                            ) : (
                                'Step 1'
                            )}
                        </div>
                    </div>
                    <div className={`${isSecondStep ? 'step active' : 'step'}`}>
                        <div>2</div>
                        <div>
                            {isThirdStep ? <Link to="/signup2">Step 2</Link> : 'Step 2'}
                        </div>
                    </div>
                    <div className={`${pathname === '/signup3' ? 'step active' : 'step'}`}>
                        <div>3</div>
                        <div>Step 3</div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}

        </React.Fragment>
    );
};

export default withRouter(Progress);