import React, {Suspense} from 'react';
import Preloader from "../components/common/preloader";

export const Suspens = (Component: any) => {
    return class extends React.Component {
        render() {
            return <div>
                <Suspense fallback={<Preloader/>}>
                    <Component{...this.props}/>
                </Suspense>
            </div>
        }
    }
}