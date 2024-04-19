

function LoginForm({ formData, handleChange, handleSubmit, error, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
        <label htmlFor="email">
            Email
        </label>
        <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
        />
        </div>
        <div>
        <label htmlFor="password">
            Password
        </label>
        <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
        />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
        {isLoading ? 'Loading...' : 'Log In'}
        </button>
    </form>
  )
}

export default LoginForm