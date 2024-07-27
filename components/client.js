import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ClientContext, clientUserMenu } from '../lib/const';
import { FormatDate } from '../lib/date';
import { Main } from './layout/article';
import Sidebar from './layout/aside';
import { NavMenu, SidebarNav } from './layout/form/nav';
import Header, { HeaderMobile } from './layout/header';
import Meta from './layout/meta';
import { Content } from './layout/section';

function ClientLayout(props) {
	const router = useRouter();
	const [verified, setVerified] = useState(false);
	const [user, setUser] = useState({});
	const [click, setClick] = useState(false);
	const [click1, setClick1] = useState(true);
	// hooks when router change
	useEffect(() => {
		(async () => {
			const currentDatetime = new Date();
			axios
				.put(
					`${process.env.IP}/users/token/ROLE_CLIENT`,
					{
						last_access: FormatDate(currentDatetime),
						last_page: router.pathname,
					},
					{ withCredentials: true }
				)
				.then((res) => {
					setVerified(true);
					setUser(res.data);
					return res;
				})
				.catch((err) => {
					setTimeout(() => {
						router.push('/client/login?redirect=' + router.asPath);
					}, 3000);
					return err;
				});
		})();
	}, [router]);
	if (verified) {
		return (
			<ClientContext.Provider value={user}>
				<Meta
					title={'undefined'}
					keywords={'undefined'}
					description={'undefined'}
				/>
				<div className='flex'>
					<div className='relative w-full flex flex-col h-screen overflow-y-hidden'>
						<div className='flex'>
							<Sidebar click={click} custom={'w-48'}>
								<ul className='space-y-2'>
									<li>
										<Link
											href={'/client'}
											className={`${
												router.pathname === '/client'
													? 'bg-gray-300'
													: 'hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
											} flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}
										>
											<div>
												<i className='fas fa-chart-pie fa-fw' />
												{click ? '' : <span className='ml-3'>Dashboard</span>}
											</div>
										</Link>
									</li>
									{click ? (
										clientUserMenu.map((value, index) => {
											return (
												<li key={index}>
													<Link
														href={value.link}
														title={value.name}
														className={`${
															router.pathname === value.path
																? 'bg-gray-300'
																: 'hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
														} flex items-center pb-3 pt-3 pr-2 pl-2 text-base font-normal text-gray-900 rounded-lg dark:text-white`}
														onClick={() => {
															if (value.link === '') {
																setClick1(true);
																setClick(false);
															}
														}}
													>
														<i className={value.icon} />
													</Link>
												</li>
											);
										})
									) : (
										<SidebarNav router={router} menus={clientUserMenu} />
									)}
								</ul>
								<ul className={`fixed bottom-0 border-t-4 mt-2 pt-0.5`}>
									{click ? (
										<button
											className=''
											onClick={() => {
												setClick1(true);
												setClick(false);
											}}
										>
											<i className='fa-solid fa-angles-right fa-2x' />
										</button>
									) : (
										<></>
									)}
									{click1 ? (
										<button
											className=''
											onClick={() => {
												setClick(true);
												setClick1(false);
											}}
										>
											<i className='fa-solid fa-angles-left fa-2x' />
											<i className='fa-solid fa-angles-left fa-2x' />
											<i className='fa-solid fa-angles-left fa-2x' />
											<i className='fa-solid fa-angles-left fa-2x' />
											<i className='fa-solid fa-angles-left fa-2x' />
										</button>
									) : (
										<></>
									)}
								</ul>
							</Sidebar>
							<Main>
								<Header
									layout={'client'}
									url={'/client/login'}
									router={router}
									url_account={'/client/account'}
									url_support={'/client/support'}
								/>
								<HeaderMobile
									url={'/client/login'}
									router={router}
									url_dashboard={'/client'}
								>
									<NavMenu router={router} menus={clientUserMenu} />
								</HeaderMobile>
								<Content>{props.children}</Content>
							</Main>
						</div>
					</div>
				</div>
			</ClientContext.Provider>
		);
	} else {
		return <></>;
	}
}

export default ClientLayout;
