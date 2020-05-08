import React from "react";
import { GameStatus, ChessType } from "../types/enums";
import './GameStatusComp.css'

interface IProps {
	status: GameStatus;
	next: ChessType.red | ChessType.black
}	


export function GameStatusComp(props:IProps) {
	let content: JSX.Element;

	if(props.status === GameStatus.gameing) {
		if(props.next === ChessType.red) {
			content = <div className="next red">红方落子</div>
		} else {
			content = <div className="next block">黑方落子</div>
		}
	} else {
		if(props.status === GameStatus.redWin) {
			content = <div className="win red">红方胜利</div>
		} else if(props.status === GameStatus.blackWin) {
			content = <div className="win block">黑方胜利</div>
		} else {
			content = <div className="win equal">平局</div>
		}
	}

	return (
		<div className="status">
			{ content }
		</div>
	)
	
}