import React from "react";

function ExchangesTable({ rows }) {
	const pretifyNumber = (number) => {
		const formtedNumber = Intl.NumberFormat(
			"en-US",
			{
				notation: "compact",
				maximumFractionDigits: 1,
			}
		).format(number);
		return formtedNumber;
	};
	return (
		<ul className="currency_table">
			<li className="header">
				<h4>Rank</h4>
				<h4>Name</h4>
				<h4>Volume(24Hr)</h4>
				<h4>Total(%)</h4>
			</li>
			{rows.map((row) => (
				<li className="row row-no-hover">
					<span>{row.rank}</span>
					<span>{row.name}</span>
					<span>
						$
						{pretifyNumber(
							row.volumeUsd
						)}
					</span>
					<span>
						{Math.round(
							row.percentTotalVolume *
								100
						) / 100}
						%
					</span>
				</li>
			))}
		</ul>
	);
}

export default ExchangesTable;
