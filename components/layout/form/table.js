import Link from 'next/link';
import { useRouter } from 'next/router';
import { rupiah } from '../../../lib/helper';
import { SwalDeletePopUp } from './pop-up';

export function Table(props) {
	const router = useRouter();
	const data = props.data;
	let item = props.data[0];
	let isDummy = item.id === undefined;
	let keys = Object.keys(item).filter(function (element) {
		return !element.match('id') && element !== 'action';
	});
	let keysRemove = Object.keys(item).filter(function (element) {
		return element.match('id') || element === 'action';
	});
	let ids = [];
	data.forEach((object) => {
		if (object.id !== undefined) {
			ids.push(object.id);
		}
		keysRemove.map((key) => {
			delete object[key];
		});
	});
	return (
		<div className='overflow-x-auto shadow-md sm:rounded-lg'>
			<div className='flex justify-between items-center px-4 py-3 overflow-auto'>
				<div className='dark:bg-gray-900'>
					<label htmlFor='table-search' className='sr-only'>
						Search
					</label>
					<div className='relative'>
						<div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
							<svg
								className='w-5 h-5 text-gray-500 dark:text-gray-400'
								aria-hidden='true'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
						<input
							type='text'
							id='table-search'
							className='block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Search for items'
						/>
					</div>
				</div>
				{props.detail !== undefined ? (
					<div className=''>
						<Link
							href={`${props.detail.redirects}`}
							className={
								'inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm dark:bg-gray-800 dark:text-white ' +
								'dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 px-4 py-2 mx-auto'
							}
						>
							Add
						</Link>
					</div>
				) : (
					props.customAddButton
				)}
			</div>
			<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
				{props.default === undefined || props.default === true ? (
					<>
						<thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-900 dark:text-gray-400'>
							{/*className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-400">*/}
							<tr>
								<th
									scope='col'
									className='border-2 border-gray-400 py-3 px-6 text-center'
								>
									No
								</th>
								{keys.map((key, index) => {
									return key !== 'id' ? (
										<th
											key={index}
											scope='col'
											className='border-2 border-gray-400 py-3 px-6 text-center'
										>
											{(key.match(/[a-zA-Z0-9]+/g) || [])
												.map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
												.join(' ')}
										</th>
									) : (
										<></>
									);
								})}
								<th
									scope='col'
									className='border-2 border-gray-400 py-3 px-6 text-center'
								>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{props.data.map((item, index) => {
								if (isDummy) {
									return '';
								} else {
									return (
										//             <tr key={index} className={`${index % 2 === 1 ? "text-gray-700 bg-gray-300 dark:bg-gray-900 dark:text-gray-400" : "hover:bg-gray-300"} border-2 border-gray-400 bg-white border-b dark:bg-gray-800 dark:border-gray-700
										// hover:bg-gray-50 dark:hover:bg-gray-600`}>
										<tr
											key={index}
											className='border-2 border-gray-400 bg-white border-b dark:bg-gray-800 dark:border-gray-700
                            hover:bg-gray-50 dark:hover:bg-gray-600'
										>
											<th
												scope='col'
												className='border-2 border-gray-400 py-3 px-6 text-center'
											>
												{index + 1}
											</th>
											{keys.map((key, indexKey) => {
												return (
													<th
														key={indexKey}
														scope='row'
														className='border-2 border-gray-400 text-center py-4 px-6'
													>
														{typeof item[key] === 'boolean' ? (
															<input
																className={
																	'w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
																}
																defaultChecked={item[key]}
																type='checkbox'
																disabled={true}
															/>
														) : typeof item[key] === 'number' && item[key] > 10000 ? (
															rupiah(item[key])
														) : (
															item[key]
														)}
													</th>
												);
											})}
											<th
												key={index}
												className='border-2 border-gray-400 text-center py-4 px-6 space-x-3'
											>
												{props.actionDefault !== undefined ? (
													<></>
												) : (
													<>
														<button
															className={
																'font-medium text-red-600 dark:text-red-500 hover:underline'
															}
															onClick={() => {
																SwalDeletePopUp({
																	url: `${process.env.NEXT_PUBLIC_IP}/master/cities/${ids[index]}/soft`,
																	router: router,
																});
															}}
														>
															<i className='fa-regular fa-trash-can fa-fw fa-1x' />
														</button>
														<Link
															href={`${router.pathname}/${ids[index]}`}
															className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
														>
															<i className='fa-regular fa-pen-to-square fa-fw fa-1x' />
														</Link>
													</>
												)}
												{props.action !== undefined ? props.action : <></>}
											</th>
										</tr>
									);
								}
							})}
						</tbody>
					</>
				) : (
					<></>
				)}
				{props.children}
			</table>
		</div>
	);
}
