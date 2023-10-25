import React, { useState, useEffect } from 'react';
import logo from './../assets/Images/logo.png';
import { HiHome, HiMagnifyingGlass, HiStar, HiPlayCircle, HiTv } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import HeaderItem from './HeaderItem';
import { auth, provider } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    selectUserName,
    selectUserPhoto,
    setUserLoginDetails,
    setSignOut,
} from "../features/User/userSlice";
import { Link } from 'react-router-dom';

function Header() {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                navigate('/home');
            }
        });
    }, [userName]);

    // handle SignIn with Google popup
    const handleAuth = () => {
        if (!userName) {
            auth.signInWithPopup(provider)
                .then((result) => {
                    setUser(result.user);
                })
                .catch((error) => {
                    alert(error.message);
                });
        } else if (userName) {
            auth.signOut()
                .then(() => {
                    dispatch(setSignOut());
                    navigate("/");
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    };

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        );
    }

    const menu = [
        {
            link: "/home",
            name: 'HOME',
            icon: HiHome
        },
        {
            link: "/search",
            name: 'SEARCH',
            icon: HiMagnifyingGlass
        },
        {
            link: "/watchlist",
            name: 'WATCH LIST',
            icon: HiPlus
        },
        {
            name: 'ORIGINALS',
            icon: HiStar
        },
        {
            name: 'MOVIES',
            icon: HiPlayCircle
        },
        {
            name: 'SERIES',
            icon: HiTv
        }
    ];

    // Style for the Sign Out button
    const signOutButtonStyle = {
        backgroundColor: '#ff0000', // Change to your desired color
        color: '#ffffff', // Text color
        padding: '8px 16px', // Adjust padding as needed
        borderRadius: '4px', // Add border-radius for a rounded look
        cursor: 'pointer',
    };

    return (
        <div className='flex items-center justify-between p-5'>
            <div className='flex justify-evenly gap-8 items-center'>
                <img src={logo} className='w-[80px] md:w-[115px] object-cover' />
                {
                    userName ?
                        <>
                            <div className='hidden md:flex gap-8'>
                                {menu.map((item) => (
                                    <Link to={item.link}>
                                        <HeaderItem name={item.name} Icon={item.icon} />
                                    </Link>
                                ))}
                            </div>
                            <div className='flex md.hidden gap-5'>
                                {menu.map((item, index) => index < 3 && (
                                    <HeaderItem name={''} Icon={item.icon} />
                                ))}
                                <div className='md.hidden' onClick={() => setToggle(!toggle)}>
                                    <HeaderItem name={''} Icon={HiDotsVertical} />
                                    {toggle ? <div className='absolute mt-3 bg-[#121212] border-[1px] border-gray-700 p-3 px-5 py-4'>
                                        {menu.map((item, index) => index > 2 && (
                                            <HeaderItem name={item.name} Icon={item.icon} />
                                        ))}
                                    </div> : null}
                                </div>
                            </div>
                        </> :
                        <></>
                }
            </div>

            {
                userName ?
                    <>
                        <div className='relative h-8 w-8 md:h-12 md:w-12 flex cursor-pointer items-center justify-end'>
                            <img src={userPhoto} alt={userName} className='w-full h-full rounded-full' />
                            <div className='absolute top-8 w-20 right-0 bg-[#121212] border border-slate-900 rounded-lg shadow-sm shadow-zinc-50 p-2 text-sm opacity-0 hover:opacity-100 duration-200'>
                                <div className="profile-info">
                                    <p>{userName}</p>
                                </div>
                                <div
                                    onClick={handleAuth}
                                    style={signOutButtonStyle}
                                >
                                    Sign Out
                                </div>
                            </div>
                        </div>
                    </> :
                    <button
                        className='bg-black py-2 px-4 uppercase border text-white border-[#f9f9f9] rounded-lg duration-200 cursor-pointer hover:bg-[#f9f9f9] hover:text-[#000] border-transparent'
                        onClick={handleAuth}
                    >
                        Login
                    </button>
            }
        </div>
    )
}

export default Header;
