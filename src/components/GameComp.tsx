import React from 'react';
import { ChessType, GameStatus } from '../types/enums';
import { BoardComp } from './BoardComp';
import { GameStatusComp } from './GameStatusComp';

interface IState {
	chesses: ChessType[],// 棋子
	gameStatus: GameStatus,
	nextChess: ChessType.red | ChessType.black, //下一次落子
}

export class GameComp extends React.Component<{}, IState> {

	state: IState = {
		chesses: [],
		gameStatus: GameStatus.gameing,
		nextChess: ChessType.black
	}
	
	componentDidMount() {
		this.init()
	}

	private init(): void {
		const arr: ChessType[] = [];
		for (let i = 0; i < 9; i++) {
			arr.push(ChessType.none);
		}
		this.setState({
			chesses: arr,
			gameStatus: GameStatus.gameing,
			nextChess: ChessType.black
		})
	}
	/**
	 * 处理棋子的点击事件
	 * 如果该函数运行说明
	 * 1. 游戏没有结束
	 * 2. 点击位置没有棋子
	 * @param index number
	 */
	private handleChessClick = (index: number) => {
		const chesses = [...this.state.chesses];
		chesses[index] = this.state.nextChess;

		this.setState( prevState => ({
			chesses,
			nextChess: prevState.nextChess === ChessType.black ? ChessType.red : ChessType.black,
			gameStatus: this.getStatus(chesses, index)
		}))
	}

	private getStatus = (chesses: ChessType[],index:number):GameStatus => {
		// 判断是否有一方获得胜利
		const horMin = Math.floor(index / 3) * 3;
		const verMin = index % 3;

		if(
			(chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2]) || // 横向的
			(chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6]) || // 纵向的
			(chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== ChessType.none) ||
			(chesses[2] === chesses[4] && chesses[2] === chesses[6] && chesses[2] !== ChessType.none)
		) {
			if(chesses[index] === ChessType.red) {
				return GameStatus.redWin;
			} else {
				return GameStatus.blackWin;
			}
		}

		// 判断是否是平局 不包含none
		if(!chesses.includes(ChessType.none)) {
			return GameStatus.equal;
		}
		
		// 游戏正在进行

		return GameStatus.gameing;
	}
	render() {
		return (
			<div style={{textAlign: 'center'}}>
				<h1>三连棋游戏</h1>
				<GameStatusComp status={this.state.gameStatus} next={this.state.nextChess}/>
				<BoardComp 
					chesses={this.state.chesses} 
					isGameOve={this.state.gameStatus !== GameStatus.gameing}
					onClick={this.handleChessClick}
					/>
				<button onClick={() => {
					this.init()
				}}>重新开始</button>
			</div>
		)
	}
}