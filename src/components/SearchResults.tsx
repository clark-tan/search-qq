import * as React from 'react';

type QQInfo = {
	name: string;
	qlogo: string;
	qq: string;
};


export interface SearchResultsProps {
	/** loading */
	loading?: boolean;
	/** data */
	data?: QQInfo | null;
	/** error */
	error:string;
}

interface SearchResultsInterface extends React.FC<SearchResultsProps> {

}


const SearchResults: SearchResultsInterface = ({
	...props
}) => {

	const { loading,data, error} = props;

	return (
		<div className="result">
			{loading && <div className="searching">查询中...</div>}
			{!loading && data && (
				<>
					<img
						className="avatar"
						src={data?.qlogo}
						alt="avatar"
					/>
					<div className="message">
						<div title={data?.name} className="name">
							{data?.name}
						</div>
						<div className="qq">{data?.qq}</div>
					</div>
				</>
			)}
			{!loading && !data && !error && <div className="nodata"></div>}
			{error && <div className="error">{error}</div>}
		</div>
	);
};

export default SearchResults;
