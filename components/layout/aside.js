export default function Sidebar(props) {
	return (
		<aside
			className={`${
				props.click ? 'w-16' : props.custom !== '' ? props.custom : 'w-64'
			} hidden xl:block shadow-xl overflow-y-auto`}
		>
			<div className='h-screen py-4 px-3 bg-gray-50 rounded dark:bg-gray-800'>
				{props.children}
			</div>
		</aside>
	);
}
