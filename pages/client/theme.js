import ClientLayout from '../../components/client';

export default function Theme() {
	return (
		<>
			<div className='w-full grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
				<div className='border-2 m-2 relative'>
					<div className='absolute top-0 left-0 bg-gray-400 m-2 text-gray-200 p-1.5 text-xs font-bold rounded'>
						Nama Tema
					</div>
					<img
						className='w-full'
						src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
						alt=''
					/>
					<div className='w-full items-center'>
						<button className='w-1/2 h-10 border-r-2 border-l-1 text-black hover:bg-gray-300'>
							Lihat
						</button>
						<button className='w-1/2 h-10 border-r-1 border-l-2 text-green-500 hover:bg-gray-300'>
							Pilih
						</button>
					</div>
				</div>
				<div className='border-2 m-2 relative'>
					<div className='absolute top-0 left-0 bg-gray-400 m-2 text-gray-200 p-1.5 text-xs font-bold rounded'>
						Nama Tema
					</div>
					<img
						className='w-full'
						src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
						alt=''
					/>
					<div className='w-full items-center'>
						<button className='w-1/2 h-10 border-r-2 border-l-1 text-black hover:bg-gray-300'>
							Lihat
						</button>
						<button className='w-1/2 h-10 border-r-1 border-l-2 text-green-500 hover:bg-gray-300'>
							Pilih
						</button>
					</div>
				</div>
				<div className='border-2 m-2 relative'>
					<div className='absolute top-0 left-0 bg-gray-400 m-2 text-gray-200 p-1.5 text-xs font-bold rounded'>
						Nama Tema
					</div>
					<img
						className='w-full'
						src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
						alt=''
					/>
					<div className='w-full items-center'>
						<button className='w-1/2 h-10 border-r-2 border-l-1 text-black hover:bg-gray-300'>
							Lihat
						</button>
						<button className='w-1/2 h-10 border-r-1 border-l-2 text-green-500 hover:bg-gray-300'>
							Pilih
						</button>
					</div>
				</div>
				<div className='border-2 m-2 relative'>
					<div className='absolute top-0 left-0 bg-gray-400 m-2 text-gray-200 p-1.5 text-xs font-bold rounded'>
						Nama Tema
					</div>
					<img
						className='w-full'
						src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
						alt=''
					/>
					<div className='w-full items-center'>
						<button className='w-1/2 h-10 border-r-2 border-l-1 text-black hover:bg-gray-300'>
							Lihat
						</button>
						<button className='w-1/2 h-10 border-r-1 border-l-2 text-green-500 hover:bg-gray-300'>
							Pilih
						</button>
					</div>
				</div>
				<div className='border-2 m-2 relative'>
					<div className='absolute top-0 left-0 bg-gray-400 m-2 text-gray-200 p-1.5 text-xs font-bold rounded'>
						Nama Tema
					</div>
					<img
						className='w-full'
						src='https://i.ytimg.com/vi/qew27BNl7io/maxresdefault.jpg'
						alt=''
					/>
					<div className='w-full items-center'>
						<button className='w-1/2 h-10 border-r-2 border-l-1 text-black hover:bg-gray-300'>
							Lihat
						</button>
						<button className='w-1/2 h-10 border-r-1 border-l-2 text-green-500 hover:bg-gray-300'>
							Pilih
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

Theme.layout = ClientLayout;
