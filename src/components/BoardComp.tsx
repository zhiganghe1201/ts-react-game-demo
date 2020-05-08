import React from "react";
import { ChessType } from "../types/enums";
import { ChessComp } from "./ChessComp";

import './BoardComp.css'

interface IProps {
	chesses: ChessType[];
	isGameOve?: boolean; // 是可选的 但是需要 默认值
	onClick?:(index: number) => void;
}
						// React.FC 泛型这样约束的props下面有children
export const BoardComp:React.FC<IProps> = function (props) {
	// const isGameOve = props.isGameOve as boolean; // 可选时值 可能为undefined  使用断言指定为boolean;
	// 非空断言： 在数据之后加上一个 ！ ,告诉TS,不用考虑该数据为空的情况；
	const isGameOve = props.isGameOve!;
	
	const list = props.chesses.map((type, i) => <ChessComp 
		key={i} 
		type={type}
		onClick={() => {
			if(props.onClick && !isGameOve) {
				props.onClick(i)
			}
		}}
	/>);

	return (
		<div className="board">
			{list}
		</div>
	)
}

BoardComp.defaultProps = {
	isGameOve: false
}