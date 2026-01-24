import { ArrowRight, Clock, Trophy, Users } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { MOCK_COMPETITIONS } from '../constants.js'
import { enterCompetition } from '../usersSlice.js'

const CompetitionCard = ({ comp }) => {
	const dispatch = useDispatch()
	const isFinished = comp.status === 'Finished'
	const isActive = comp.status === 'Active'

	const handleEnterArena = () => {
		// only let users enter active competitions
		if (isActive) {
			dispatch(enterCompetition(comp.id))
		}
	}

	return (
		<div className='group bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-rose-100 transition-all duration-300 relative overflow-hidden flex flex-col'>
			<div className='flex items-center justify-between mb-6'>
				<span
					className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${
						isActive
							? 'bg-rose-50 border-rose-100 text-rose-600'
							: isFinished
								? 'bg-slate-100 border-slate-200 text-slate-500'
								: 'bg-indigo-50 border-indigo-100 text-indigo-600'
					}`}
				>
					{comp.status}
				</span>
				<Trophy
					className={`w-5 h-5 ${isActive ? 'text-rose-500' : 'text-slate-300'}`}
				/>
			</div>

			<h3 className='text-xl font-extrabold text-slate-900 leading-tight mb-2 group-hover:text-rose-600 transition-colors'>
				{comp.title}
			</h3>
			<p className='text-xs font-semibold text-slate-400 uppercase tracking-wide mb-6'>
				Focus: {comp.subject}
			</p>

			<div className='flex items-center gap-6 mb-8 text-slate-500'>
				<div className='flex items-center gap-2'>
					<Users className='w-4 h-4' />
					<span className='text-xs font-bold'>{comp.participants} Joined</span>
				</div>
				<div className='flex items-center gap-2'>
					<Clock className='w-4 h-4' />
					<span className='text-xs font-bold'>{comp.deadline}</span>
				</div>
			</div>

			<div className='mt-auto'>
				<div className='flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase mb-2'>
					<span>Competition Progress</span>
					<span className='text-slate-900'>{comp.progress}%</span>
				</div>
				<div className='h-2 bg-slate-100 rounded-full overflow-hidden mb-6'>
					<div
						className={`h-full rounded-full transition-all duration-1000 ${isActive ? 'bg-gradient-to-r from-rose-500 to-rose-600' : 'bg-slate-300'}`}
						style={{ width: `${comp.progress}%` }}
					></div>
				</div>

				<button
					onClick={handleEnterArena}
					className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${
						isActive
							? 'bg-rose-600 text-white shadow-lg shadow-rose-200 hover:bg-rose-700'
							: 'bg-slate-100 text-slate-500 hover:bg-slate-200'
					}`}
				>
					{isActive
						? 'Enter Arena'
						: isFinished
							? 'View Recap'
							: 'Register Now'}
					<ArrowRight className='w-4 h-4' />
				</button>
			</div>

			{isActive && (
				<div className='absolute top-0 right-0 w-32 h-32 bg-rose-50 opacity-0 group-hover:opacity-100 -mr-16 -mt-16 rounded-full transition-opacity pointer-events-none'></div>
			)}
		</div>
	)
}

const Competitions = () => {
	return (
		<div className='animate-in fade-in slide-in-from-bottom-4 duration-700'>
			<div className='flex items-center justify-between mb-10'>
				<div>
					<h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
						Academic Competitions
					</h1>
					<p className='text-slate-500 text-sm mt-1 font-medium'>
						Join time-limited challenges to boost your rank and win merit
						scholarships.
					</p>
				</div>
				<button className='px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200'>
					Propose New Group Challenge
				</button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{MOCK_COMPETITIONS.map(comp => (
					<CompetitionCard key={comp.id} comp={comp} />
				))}
			</div>

			<div className='mt-16 bg-white rounded-[40px] border border-slate-100 p-10 relative overflow-hidden'>
				<div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8'>
					<div className='max-w-xl'>
						<h2 className='text-2xl font-black text-slate-900 mb-4'>
							Mastering the SAT: Grand Championship 2024
						</h2>
						<p className='text-slate-500 font-medium mb-6'>
							The ultimate evaluation for top 1% candidates. This competition
							covers every section of the new Digital SAT with adaptive
							questioning.
						</p>
						<div className='flex items-center gap-4'>
							<div className='flex -space-x-3'>
								{[1, 2, 3, 4, 5].map(i => (
									<div
										key={i}
										className='w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden'
									>
										<img
											src={`https://picsum.photos/id/${i + 20}/100/100`}
											alt='User'
										/>
									</div>
								))}
								<div className='w-10 h-10 rounded-full border-2 border-white bg-rose-100 flex items-center justify-center text-[10px] font-bold text-rose-600'>
									+124
								</div>
							</div>
							<span className='text-sm font-bold text-slate-400'>
								Competing now
							</span>
						</div>
					</div>
					<div className='bg-rose-600 text-white p-8 rounded-3xl flex flex-col items-center min-w-[200px] shadow-xl shadow-rose-200'>
						<span className='text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2'>
							Registration Closes In
						</span>
						<span className='text-4xl font-black mb-4'>12:45:02</span>
						<button className='w-full bg-white text-rose-600 py-3 rounded-xl font-extrabold text-sm hover:bg-rose-50 transition-colors'>
							Secure Entry Slot
						</button>
					</div>
				</div>

				<div className='absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-[0.03]'>
					<Trophy className='w-[400px] h-[400px] text-slate-900' />
				</div>
			</div>
		</div>
	)
}

export default Competitions
