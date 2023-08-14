/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClientLayout from '../../components/client';
import { MultipleUploadImage } from '../../components/layout/form/input';
import { TabsNavigation } from '../../components/layout/form/tabs';
import { Spinner1 } from '../../components/layout/spinner';

export default function Gallery() {
	const router = useRouter();
	const [activeStatus, setActiveStatus] = useState(0);
	const [inputFields, setInputFields] = useState({
		name: '',
		description: '',
		phone_number: '',
		email: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [click, setClick] = useState(false);
	const [data, setData] = useState([
		{
			id: 1,
			name: 'Firman Agam',
			description: '',
			phone_number: '081214025919',
			email: 'agam.pro234@gmail.com',
		},
		{
			id: 2,
			name: 'Firda Dwi Gameswanti',
			description: '',
			phone_number: '089625453562',
			email: 'firdagms@gmail.com',
		},
	]);
	const [dataCongratulation, setDataCongratulation] = useState([
		{
			id: 1,
			name: 'Firman Agam',
			invitation_arrival: '',
			persons: '081214025919',
			congratulation: 'agam.pro234@gmail.com',
		},
		{
			id: 1,
			name: 'Firman Agam',
			invitation_arrival: '',
			persons: '081214025919',
			congratulation: 'agam.pro234@gmail.com',
		},
	]);
	useEffect(() => {
		setIsLoading(true);

		async function fetch() {
			let size = 10;
			let sort = 'sort';
		}

		fetch().then(() => setIsLoading(false));
	}, [router]);
	const tabs = [
		{
			path: 'photo',
			name: 'Photo',
			icon: 'fas fa-users fa-fw fa-1x',
		},
		{
			path: 'nasheed',
			name: 'Nasheed',
			icon: 'fas fa-comment fa-fw fa-1x',
		},
		{
			path: 'video',
			name: 'Video',
			icon: 'fas fa-users fa-fw fa-1x',
		},
		{
			path: 'streaming',
			name: 'Streaming',
			icon: 'fas fa-comment fa-fw fa-1x',
		},
	];
	useEffect(() => {
		setData([
			{
				id: 1,
				name: 'Firman Agam',
				description: '',
				phone_number: '081214025919',
				email: 'agam.pro234@gmail.com',
			},
			{
				id: 2,
				name: 'Firda Dwi Gameswanti',
				description: '',
				phone_number: '089625453562',
				email: 'firdagms@gmail.com',
			},
		]);
		setDataCongratulation([
			{
				id: 1,
				name: 'Firman Agam & Firda Dwi Gameswanti',
				invitation_arrival: 'Hadir',
				persons: '6',
				congratulation: 'Jazakallahu khairan katsiran',
			},
			{
				id: 2,
				name: 'Deasy Sukma Pertiwi & Suami',
				invitation_arrival: 'Insya Allah',
				persons: '5',
				congratulation: 'Barakallahu fiikum',
			},
		]);
	}, [activeStatus]);
	if (isLoading) return <Spinner1 />;
	return (
		<>
			<TabsNavigation
				tabs={tabs}
				router={router}
				active={activeStatus}
				setActive={setActiveStatus}
			/>

			{activeStatus === 0 ? <MultipleUploadImage /> : <></>}
			{activeStatus === 1 ? <NasheedTable /> : <></>}
			{activeStatus === 2 ? <VideoTable /> : <></>}
		</>
	);
}

Gallery.layout = ClientLayout;

export const NasheedTable = () => {
	const listNasheed = [
		{
			title: 'My Hope',
			singer: 'Muhammad Al Muqit',
		},
		{
			title: 'The Way of the Tears',
			singer: 'Muhammad Al Muqit',
		},
	];
	return (
		<>
			<div className='p-2 bg-white shadow rounded-md rounded-t-none overflow-hidden'>
				<h3 className='px-5 text-xs font-semibold border-b-2 py-4 text-gray-500 uppercase tracking-wide'>
					List Nasheed
				</h3>{' '}
				<div className='flow-root'>
					<ul role='list' className='border-gray-200 divide-y divide-gray-200'>
						{listNasheed.map((nasheed) => {
							return (
								<>
									<li className='py-4 px-5 hover:bg-gray-50'>
										<div className='flex items-center sm:space-x-4'>
											<div className='flex-shrink-0 hidden sm:flex'>
												<img
													src='Galeri%20-%20Musik_files/music.jpeg'
													alt='icon'
													className='h-8 w-8 rounded-full'
												/>
											</div>{' '}
											<div className='flex-1 min-w-0'>
												<p className='text-sm font-medium text-gray-900 truncate'>
													{nasheed.title}
												</p>{' '}
												<p className='text-sm text-gray-500 truncate'>{nasheed.singer}</p>
											</div>{' '}
											<div className='flex items-center'>
												{' '}
												<a className='cursor-pointer inline-flex mr-2 items-center shadow-sm text-gray-700 bg-white hover:bg-gray-50'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'
														width='24px'
														height='24px'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth='2'
															d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
														></path>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth='2'
															d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
														></path>
													</svg>
												</a>{' '}
												<button className='bg-gray-100 hover:bg-gray-200 focus:ring-pinky-500 inline-flex items-center px-3 py-0.5 text-xs border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2'>
													Choose
												</button>
											</div>
										</div>
									</li>
								</>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};

export const VideoTable = () => {
	return (
		<div className='holder w-full grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
			<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
				<img
					className='w-full'
					src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
					alt=''
				/>
				<div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
					Live
				</div>
				{/* <div className='info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300'>
					<span className='mr-1 p-1 px-2 font-bold'>105 Watching</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Likes
					</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Dislikes
					</span>
				</div> */}
				<div className='desc p-4 text-gray-800'>
					<a
						href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
						target='_new'
						className='title font-bold block cursor-pointer hover:underline'
					>
						Pubg Mobile Custom Room (Unlimited)
					</a>
					<a
						href='https://www.youtube.com/user/sam14319'
						target='_new'
						className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
					>
						@dynamo_gaming
					</a>
					<span className='description text-sm block py-2 border-gray-400 mb-2'>
						lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
					</span>
				</div>
			</div>
			<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
				<img
					className='w-full'
					src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
					alt=''
				/>
				<div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
					Live
				</div>
				<div className='info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300'>
					<span className='mr-1 p-1 px-2 font-bold'>105 Watching</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Likes
					</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Dislikes
					</span>
				</div>
				<div className='desc p-4 text-gray-800'>
					<a
						href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
						target='_new'
						className='title font-bold block cursor-pointer hover:underline'
					>
						Pubg Mobile Custom Room (Unlimited)
					</a>
					<a
						href='https://www.youtube.com/user/sam14319'
						target='_new'
						className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
					>
						@dynamo_gaming
					</a>
					<span className='description text-sm block py-2 border-gray-400 mb-2'>
						lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
					</span>
				</div>
			</div>
			<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
				<img
					className='w-full'
					src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
					alt=''
				/>
				<div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
					Live
				</div>
				<div className='info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300'>
					<span className='mr-1 p-1 px-2 font-bold'>105 Watching</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Likes
					</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Dislikes
					</span>
				</div>
				<div className='desc p-4 text-gray-800'>
					<a
						href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
						target='_new'
						className='title font-bold block cursor-pointer hover:underline'
					>
						Pubg Mobile Custom Room (Unlimited)
					</a>
					<a
						href='https://www.youtube.com/user/sam14319'
						target='_new'
						className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
					>
						@dynamo_gaming
					</a>
					<span className='description text-sm block py-2 border-gray-400 mb-2'>
						lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
					</span>
				</div>
			</div>
			<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
				<img
					className='w-full'
					src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
					alt=''
				/>
				<div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
					Live
				</div>
				<div className='info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300'>
					<span className='mr-1 p-1 px-2 font-bold'>105 Watching</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Likes
					</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Dislikes
					</span>
				</div>
				<div className='desc p-4 text-gray-800'>
					<a
						href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
						target='_new'
						className='title font-bold block cursor-pointer hover:underline'
					>
						Pubg Mobile Custom Room (Unlimited)
					</a>
					<a
						href='https://www.youtube.com/user/sam14319'
						target='_new'
						className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
					>
						@dynamo_gaming
					</a>
					<span className='description text-sm block py-2 border-gray-400 mb-2'>
						lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
					</span>
				</div>
			</div>
			<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
				<img
					className='w-full'
					src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
					alt=''
				/>
				<div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
					Live
				</div>
				<div className='info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300'>
					<span className='mr-1 p-1 px-2 font-bold'>105 Watching</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Likes
					</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Dislikes
					</span>
				</div>
				<div className='desc p-4 text-gray-800'>
					<a
						href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
						target='_new'
						className='title font-bold block cursor-pointer hover:underline'
					>
						Pubg Mobile Custom Room (Unlimited)
					</a>
					<a
						href='https://www.youtube.com/user/sam14319'
						target='_new'
						className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
					>
						@dynamo_gaming
					</a>
					<span className='description text-sm block py-2 border-gray-400 mb-2'>
						lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
					</span>
				</div>
			</div>
			<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
				<img
					className='w-full'
					src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
					alt=''
				/>
				<div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
					Live
				</div>
				<div className='info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300'>
					<span className='mr-1 p-1 px-2 font-bold'>105 Watching</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Likes
					</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Dislikes
					</span>
				</div>
				<div className='desc p-4 text-gray-800'>
					<a
						href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
						target='_new'
						className='title font-bold block cursor-pointer hover:underline'
					>
						Pubg Mobile Custom Room (Unlimited)
					</a>
					<a
						href='https://www.youtube.com/user/sam14319'
						target='_new'
						className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
					>
						@dynamo_gaming
					</a>
					<span className='description text-sm block py-2 border-gray-400 mb-2'>
						lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
					</span>
				</div>
			</div>
			<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
				<img
					className='w-full'
					src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
					alt=''
				/>
				<div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
					Live
				</div>
				<div className='info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300'>
					<span className='mr-1 p-1 px-2 font-bold'>105 Watching</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Likes
					</span>
					<span className='mr-1 p-1 px-2 font-bold border-l border-gray-400'>
						105 Dislikes
					</span>
				</div>
				<div className='desc p-4 text-gray-800'>
					<a
						href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
						target='_new'
						className='title font-bold block cursor-pointer hover:underline'
					>
						Pubg Mobile Custom Room (Unlimited)
					</a>
					<a
						href='https://www.youtube.com/user/sam14319'
						target='_new'
						className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
					>
						@dynamo_gaming
					</a>
					<span className='description text-sm block py-2 border-gray-400 mb-2'>
						lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
					</span>
				</div>
			</div>
		</div>
	);
};
