import { Plus } from "lucide-react";

const QuickTransactionAdd = () => {

    const inputStyle = "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";

    return (
        <form className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Quick Add</h3>

            <div>
                <div className="flex space-x-3">
                    <label className={`flex-1 p-3 text-center rounded-lg cursor-pointer transition-colors ${true ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        <input
                            type="radio"
                            name="type"
                            value="Income"
                            checked={true}
                            className="hidden"
                        />
                        Income
                    </label>
                    <label className={`flex-1 p-3 text-center rounded-lg cursor-pointer transition-colors ${true ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        <input
                            type="radio"
                            name="type"
                            value="Expense"
                            checked={true}
                            className="hidden"
                        />
                        Expense
                    </label>
                </div>
            </div>

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="e.g., 4500"
                    className={inputStyle}
                    required
                    min="0.01"
                    step="0.01"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="e.g., Monthly Salary"
                    className={inputStyle}
                    required
                />
            </div>

            <button
                type="submit"
                className={`w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 flex items-center justify-center`}
            >
                <Plus className="w-5 h-5 mr-2" />
                Record Transaction
            </button>
        </form>
    );
};

export default QuickTransactionAdd;