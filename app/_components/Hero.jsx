import React from 'react'

function Hero() {
    return (
        <div>
            <section className="bg-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1
                            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                        >
                            Understand the Expense Tracker!!

                            <span className="sm:block"> Got a Track</span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Tired of wondering where your money goes? 😩 Expense-Tracker is here to help! ‍♀️ Our user-friendly expense tracker website makes it easy and efficient to manage your finances, empowering you to make informed decisions about your spending. 📈
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                className="block w-full rounded border border-red-600 bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                href='/sign-in'
                            >
                                Get Started
                            </a>

                            <a
                                className="block w-full rounded border border-red-600 bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                                href='/dashboard'
                            >
                                Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero