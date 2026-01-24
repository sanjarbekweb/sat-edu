import { Search } from 'lucide-react'

const Header = ({ collapsed }) => {
	// hook up search functionality
	return (
		<header
			className={`fixed top-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-40 transition-all duration-300 md:mx-2 md:rounded-2xl ${collapsed ? 'md:left-20' : 'md:left-64'} left-0`}
		>
			<div className='flex-1 max-w-xl relative group'>
				<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-rose-500 transition-colors' />
				<input
					type='text'
					placeholder='Search students, results, arena history...'
					className='w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-rose-200 transition-all duration-200'
				/>
			</div>

			<div className='flex items-center gap-4'>
				<div className='h-8 w-[1px] bg-slate-200 mx-2'></div>

				{/* user profile */}
				<div className='flex items-center gap-3 cursor-pointer group'>
					<div className='text-right hidden sm:block'>
						<p className='text-xs font-bold text-slate-900 leading-none'>
							Alex Johnson
						</p>
						<p className='text-[10px] text-slate-500 uppercase font-semibold'>
							Student Account
						</p>
					</div>
					<div className='w-9 h-9 bg-rose-600 rounded-lg flex items-center justify-center text-white font-bold border-2 border-rose-500 shadow-sm group-hover:scale-105 transition-transform'>
						AJ
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
