import React, { useEffect, useState } from "react";
import { isValidQQ }  from './utils/Valid';
import "./App.css";
import SearchResults from "./components/SearchResults";
import { useDebounce } from "./utils/Util";

type QQInfo = {
	name: string;
	qlogo: string;
	qq: string;
};

function App() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const [data, setData] = useState<QQInfo | null>(null);
	const [search, setSearch] = useState("");

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value.trim());
	};

	const handleSearch = (value: string) => {
		if (value.length === 0) {
			setLoading(false);
			setData(null);
			setError("");
			return;
		}

		if (!isValidQQ(value)) {
			setData(null);
			setError("QQ号应该为4位以上的数字！");
			return;
		}

		setError("");
		setLoading(true);
		fetch(`https://api.uomg.com/api/qq.info?qq=${value}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.code !== 1) {
					setError(data.msg);
					setData(null);
				} else {
					setError("");
					setData({
						name: data.name,
						qlogo: data.qlogo,
						qq: data.qq,
					});
				}
			})
			.finally(() => setLoading(false));
	};

	const debounceSearch = useDebounce(search, 500);

	useEffect(() => { handleSearch(debounceSearch); }, [debounceSearch]);

	return (
		<div className="App">
			<div className="title">QQ号查询</div>
			<input
				className="input"
				type="text"
				placeholder="QQ号"
				value={search}
				onChange={onChange}
			/>
			<SearchResults loading={loading}  data={data} error={error}/>
		</div>
	);
}

export default App;
