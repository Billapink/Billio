import {React} from 'react';
import NavBar from './NavBar';
import Header from './Header';

function Achievements() {

    return (
        <div>
        <Header/>
        <div className=' pt-[100px] flex justify-center'>
                <div className=' text-black font-bold text-3xl' >Achievements</div>
        </div>
        <NavBar/>
        </div>
    );
}

export default Achievements;