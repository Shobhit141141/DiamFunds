import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Horizon } from 'diamante-sdk-js';
import toast from 'react-hot-toast';

const links = [
	{ label: '🏠 Homepage', to: '/' },
	{ label: '📊 Dashboard', to: '/dashboard' },
	{ label: '📋 Start Fund Raiser', to: '/list-fund' },
];

const Navbar = () => {
	const server = new Horizon.Server('https://diamtestnet.diamcircle.io');
	const [balance, setBalance] = useState(0);
	const navigate = useNavigate();
	const fetchDiamBalance = async () => {
		try {
			const response = await server.loadAccount(
				localStorage.getItem('public_address')
			);
			setBalance(response.balances[0].balance);
		} catch (error) {
			console.error('Failed to fetch balance:', error);
		}
	};
	const publicAddress = localStorage.getItem('public_address');
	const addressLen = publicAddress ? publicAddress.length : 0;
	useEffect(() => {
		fetchDiamBalance();
	}, [balance]);
	return (
		<div className='navbar flex items-center justify-between bg-base-200 text-white'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h16M4 18h7'
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50'
					>
						{links.map((link, index) => (
							<li key={index}>
								<Link to={link.to}>{link.label}</Link>
							</li>
						))}
					</ul>
				</div>
				<Link to={'/'}>
					<div className='navbar-center flex justify-center items-center'>
						<img
							src='/logo.png'
							alt=''
							className='w-[45px] h-auto object-cover'
						/>
						<p className='text-3xl font-bold ml-2 '>DiamFunds</p>
					</div>
				</Link>
			</div>
			<div className='text-black flex min-w-[27%] gap-x-2 border-2 bg-gray-900 border-cyan-500 rounded-full p-1'>
				{publicAddress && (
					<div
						onClick={() => {
							navigator.clipboard.writeText(publicAddress);
							toast.success('Public address copied to clipboard!', {
								style: {
									background: '#7065F0',
									color: 'white',
								},
							});
						}}
						className='cursor-pointer border-1 bg-cyan-200 rounded-full p-2'
					>
						{publicAddress.slice(0, 5) +
							'...' +
							publicAddress.slice(addressLen - 5)}
					</div>
				)}

				<div className='flex items-center gap-2 border-1 w-full bg-cyan-200 rounded-full p-2'>
					<img src='/diam.png' width={50} alt='' />
					<p>{balance} DIAMS</p>
				</div>
			</div>
			<div className='flex items-center w-[40%] justify-between mx-3'>
				<button
					onClick={() => {
						navigate('/list-fund');
					}}
					className='bg-cyan-600 hover:bg-cyan-500 py-2 px-3 text-lg rounded-xl'
				>
					Raise Funds 🚀
				</button>
				<button
					onClick={() => {
						navigate('/dashboard');
					}}
					className='bg-cyan-600 hover:bg-cyan-500 py-2 px-3 text-lg rounded-xl'
				>
					Account 💳
				</button>
				<button
					onClick={() => {
						localStorage.clear();
						navigate('/login');
					}}
					className='bg-cyan-600 hover:bg-cyan-500 py-2 px-3 text-lg rounded-xl'
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Navbar;
