import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { AdminContext, ClientContext } from '../../lib/const';
import { toPascalCase } from '../../lib/helper';

export default function Header(props) {
	let user = {};
	if (props.layout === 'admin') {
		user = AdminContext._currentValue;
	} else if (props.layout === 'client') {
		user = ClientContext._currentValue;
	}
	const [click, setCLick] = useState(false);
	const [btnClick, setBtnClick] = useState(true);
	const handleClick = () => {
		click ? setCLick(false) : setCLick(true);
		btnClick ? setBtnClick(true) : setBtnClick(true);
	};
	const handleBtnClick = () => {
		btnClick ? setBtnClick(false) : setBtnClick(true);
	};
	let pictureUrl, pictureTitle;
	if (user.picture) {
		pictureUrl = user.picture.url;
		pictureTitle = user.picture.title;
	} else {
		pictureTitle = 'anonymous character';
		pictureUrl =
			'https://www.pngitem.com/pimgs/m/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png';
	}
	return (
		<header className='w-full items-center bg-gray-100 py-2 px-6 flex flex-row justify-between'>
			<div className='xl:w-1/2 justify-between'>
				<h6>
					Hi, {toPascalCase(user.person.given_name)}{' '}
					{toPascalCase(user.person.middle_name)}
				</h6>
			</div>
			<div className=' xl:w-1/2 flex justify-end'>
				<button
					className='relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300
                    focus:border-gray-300 focus:outline-none'
					onClick={handleClick}
				>
					<img src={pictureUrl} alt={pictureTitle} />
				</button>
				{click ? (
					<Dropdowns
						click={click}
						btnClick={btnClick}
						handleBtnClick={handleBtnClick}
						url_account={props.url_account}
						url_support={props.url_support}
						url={props.url}
						router={props.router}
					/>
				) : (
					<></>
				)}
			</div>
		</header>
	);
}

function Dropdowns(props) {
	return (
		<>
			<button
				onClick={props.handleBtnClick}
				className={`${
					props.btnClick ? 'h-full w-full fixed inset-0 cursor-default' : ''
				}`}
			/>
			<div className='absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16'>
				<Link href={props.url_account}>
					<a className='block px-4 py-2 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700'>
						Account
					</a>
				</Link>
				<Link href={props.url_support}>
					<a className='block px-4 py-2 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700'>
						Support
					</a>
				</Link>
				<label
					className='cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-700'
					onClick={() => handleSignOut(props)}
				>
					Sign Out
				</label>
			</div>
		</>
	);
}

// Mobile Phone
// Down
export function HeaderMobile(props) {
	const [click, setClick] = useState(false);
	const [click1, setClick1] = useState(true);
	return (
		<header className={'w-full bg-gray-500 py-5 px-6 xl:hidden overflow-y-auto'}>
			<div className='flex items-center justify-between'>
				<a
					href={'/admin'}
					className='text-black text-3xl font-semibold uppercase hover:text-gray-300'
				>
					Administrator
				</a>
				{click ? (
					<button
						className='text-black text-3xl focus:outline-none'
						onClick={() => {
							setClick1(true);
							setClick(false);
						}}
					>
						<i className='fas fa-times' />
					</button>
				) : (
					<></>
				)}
				{click1 ? (
					<button
						className='text-black text-3xl focus:outline-none'
						onClick={() => {
							setClick(true);
							setClick1(false);
						}}
					>
						<i className='fas fa-bars' />
					</button>
				) : (
					<></>
				)}
			</div>
			<div className={'overflow-auto'}>
				{click ? (
					<NavHeader
						url_dashboard={props.url_dashboard}
						router={props.router}
						url={props.url}
					>
						{props.children}
					</NavHeader>
				) : (
					<></>
				)}
			</div>
		</header>
	);
}

export function NavHeader(props) {
	return (
		<nav className='flex flex-col pt-4'>
			<ul>
				<li>
					<Link href={props.url_dashboard}>
						<a
							className={`flex items-center text-black ${
								props.router.pathname === '/admin'
									? 'bg-gray-200'
									: 'opacity-75 hover:opacity-100'
							} py-2 pl-2 hover:bg-gray-50`}
						>
							<i className='fas fa-tachometer-alt fa-fw' />
							<span className='ml-3 text-black'>Dashboard</span>
						</a>
					</Link>
				</li>
				{props.children}
			</ul>
		</nav>
	);
}

// Up
// Mobile Phone

const handleSignOut = (props) => {
	Swal.fire({
		title: 'Do you want to logout?',
		showCancelButton: true,
		confirmButtonText: `Yes`,
	}).then((result) => {
		if (result.isConfirmed) {
			(async () => {
				const response = await axios
					.get(`${process.env.NEXT_PUBLIC_IP}/auth/logout`, {
						// disable with credentials if be not regis your ip to be cors
						withCredentials: true,
					})
					.then((res) => {
						return res;
					})
					.catch((err) => {
						return err;
					});
				if (response.status === 200) {
					Swal.fire({ title: 'Success Logout!', icon: 'success', timer: 5000 }).then(
						(res) => {
							props.router.push(`${props.url}`);
						}
					);
				}
			})();
		}
	});
};
