// Generated from fhirpath.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { fhirpathListener } from "./fhirpathListener";
import { fhirpathVisitor } from "./fhirpathVisitor";


export class fhirpathParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly T__41 = 42;
	public static readonly T__42 = 43;
	public static readonly T__43 = 44;
	public static readonly T__44 = 45;
	public static readonly T__45 = 46;
	public static readonly T__46 = 47;
	public static readonly T__47 = 48;
	public static readonly T__48 = 49;
	public static readonly T__49 = 50;
	public static readonly T__50 = 51;
	public static readonly T__51 = 52;
	public static readonly T__52 = 53;
	public static readonly T__53 = 54;
	public static readonly DATE = 55;
	public static readonly DATETIME = 56;
	public static readonly TIME = 57;
	public static readonly IDENTIFIER = 58;
	public static readonly DELIMITEDIDENTIFIER = 59;
	public static readonly STRING = 60;
	public static readonly NUMBER = 61;
	public static readonly WS = 62;
	public static readonly COMMENT = 63;
	public static readonly LINE_COMMENT = 64;
	public static readonly RULE_expression = 0;
	public static readonly RULE_term = 1;
	public static readonly RULE_literal = 2;
	public static readonly RULE_externalConstant = 3;
	public static readonly RULE_invocation = 4;
	public static readonly RULE_function = 5;
	public static readonly RULE_paramList = 6;
	public static readonly RULE_quantity = 7;
	public static readonly RULE_unit = 8;
	public static readonly RULE_dateTimePrecision = 9;
	public static readonly RULE_pluralDateTimePrecision = 10;
	public static readonly RULE_typeSpecifier = 11;
	public static readonly RULE_qualifiedIdentifier = 12;
	public static readonly RULE_identifier = 13;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"expression", "term", "literal", "externalConstant", "invocation", "function", 
		"paramList", "quantity", "unit", "dateTimePrecision", "pluralDateTimePrecision", 
		"typeSpecifier", "qualifiedIdentifier", "identifier",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'.'", "'['", "']'", "'+'", "'-'", "'*'", "'/'", "'div'", "'mod'", 
		"'&'", "'is'", "'as'", "'|'", "'<='", "'<'", "'>'", "'>='", "'='", "'~'", 
		"'!='", "'!~'", "'in'", "'contains'", "'and'", "'or'", "'xor'", "'implies'", 
		"'('", "')'", "'{'", "'}'", "'true'", "'false'", "'%'", "'$this'", "'$index'", 
		"'$total'", "','", "'year'", "'month'", "'week'", "'day'", "'hour'", "'minute'", 
		"'second'", "'millisecond'", "'years'", "'months'", "'weeks'", "'days'", 
		"'hours'", "'minutes'", "'seconds'", "'milliseconds'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, "DATE", 
		"DATETIME", "TIME", "IDENTIFIER", "DELIMITEDIDENTIFIER", "STRING", "NUMBER", 
		"WS", "COMMENT", "LINE_COMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(fhirpathParser._LITERAL_NAMES, fhirpathParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return fhirpathParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "fhirpath.g4"; }

	// @Override
	public get ruleNames(): string[] { return fhirpathParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return fhirpathParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(fhirpathParser._ATN, this);
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 0;
		this.enterRecursionRule(_localctx, 0, fhirpathParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 32;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case fhirpathParser.T__10:
			case fhirpathParser.T__11:
			case fhirpathParser.T__21:
			case fhirpathParser.T__22:
			case fhirpathParser.T__27:
			case fhirpathParser.T__29:
			case fhirpathParser.T__31:
			case fhirpathParser.T__32:
			case fhirpathParser.T__33:
			case fhirpathParser.T__34:
			case fhirpathParser.T__35:
			case fhirpathParser.T__36:
			case fhirpathParser.DATE:
			case fhirpathParser.DATETIME:
			case fhirpathParser.TIME:
			case fhirpathParser.IDENTIFIER:
			case fhirpathParser.DELIMITEDIDENTIFIER:
			case fhirpathParser.STRING:
			case fhirpathParser.NUMBER:
				{
				_localctx = new TermExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 29;
				this.term();
				}
				break;
			case fhirpathParser.T__3:
			case fhirpathParser.T__4:
				{
				_localctx = new PolarityExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 30;
				_la = this._input.LA(1);
				if (!(_la === fhirpathParser.T__3 || _la === fhirpathParser.T__4)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 31;
				this.expression(11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 74;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 72;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						_localctx = new MultiplicativeExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 34;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 35;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << fhirpathParser.T__5) | (1 << fhirpathParser.T__6) | (1 << fhirpathParser.T__7) | (1 << fhirpathParser.T__8))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 36;
						this.expression(11);
						}
						break;

					case 2:
						{
						_localctx = new AdditiveExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 37;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 38;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << fhirpathParser.T__3) | (1 << fhirpathParser.T__4) | (1 << fhirpathParser.T__9))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 39;
						this.expression(10);
						}
						break;

					case 3:
						{
						_localctx = new UnionExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 40;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 41;
						this.match(fhirpathParser.T__12);
						this.state = 42;
						this.expression(8);
						}
						break;

					case 4:
						{
						_localctx = new InequalityExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 43;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 44;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << fhirpathParser.T__13) | (1 << fhirpathParser.T__14) | (1 << fhirpathParser.T__15) | (1 << fhirpathParser.T__16))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 45;
						this.expression(7);
						}
						break;

					case 5:
						{
						_localctx = new EqualityExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 46;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 47;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << fhirpathParser.T__17) | (1 << fhirpathParser.T__18) | (1 << fhirpathParser.T__19) | (1 << fhirpathParser.T__20))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 48;
						this.expression(6);
						}
						break;

					case 6:
						{
						_localctx = new MembershipExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 49;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 50;
						_la = this._input.LA(1);
						if (!(_la === fhirpathParser.T__21 || _la === fhirpathParser.T__22)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 51;
						this.expression(5);
						}
						break;

					case 7:
						{
						_localctx = new AndExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 52;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 53;
						this.match(fhirpathParser.T__23);
						this.state = 54;
						this.expression(4);
						}
						break;

					case 8:
						{
						_localctx = new OrExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 55;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 56;
						_la = this._input.LA(1);
						if (!(_la === fhirpathParser.T__24 || _la === fhirpathParser.T__25)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 57;
						this.expression(3);
						}
						break;

					case 9:
						{
						_localctx = new ImpliesExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 58;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 59;
						this.match(fhirpathParser.T__26);
						this.state = 60;
						this.expression(2);
						}
						break;

					case 10:
						{
						_localctx = new InvocationExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 61;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 62;
						this.match(fhirpathParser.T__0);
						this.state = 63;
						this.invocation();
						}
						break;

					case 11:
						{
						_localctx = new IndexerExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 64;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 65;
						this.match(fhirpathParser.T__1);
						this.state = 66;
						this.expression(0);
						this.state = 67;
						this.match(fhirpathParser.T__2);
						}
						break;

					case 12:
						{
						_localctx = new TypeExpressionContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 69;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 70;
						_la = this._input.LA(1);
						if (!(_la === fhirpathParser.T__10 || _la === fhirpathParser.T__11)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 71;
						this.typeSpecifier();
						}
						break;
					}
					}
				}
				this.state = 76;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public term(): TermContext {
		let _localctx: TermContext = new TermContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, fhirpathParser.RULE_term);
		try {
			this.state = 84;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case fhirpathParser.T__10:
			case fhirpathParser.T__11:
			case fhirpathParser.T__21:
			case fhirpathParser.T__22:
			case fhirpathParser.T__34:
			case fhirpathParser.T__35:
			case fhirpathParser.T__36:
			case fhirpathParser.IDENTIFIER:
			case fhirpathParser.DELIMITEDIDENTIFIER:
				_localctx = new InvocationTermContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 77;
				this.invocation();
				}
				break;
			case fhirpathParser.T__29:
			case fhirpathParser.T__31:
			case fhirpathParser.T__32:
			case fhirpathParser.DATE:
			case fhirpathParser.DATETIME:
			case fhirpathParser.TIME:
			case fhirpathParser.STRING:
			case fhirpathParser.NUMBER:
				_localctx = new LiteralTermContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 78;
				this.literal();
				}
				break;
			case fhirpathParser.T__33:
				_localctx = new ExternalConstantTermContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 79;
				this.externalConstant();
				}
				break;
			case fhirpathParser.T__27:
				_localctx = new ParenthesizedTermContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 80;
				this.match(fhirpathParser.T__27);
				this.state = 81;
				this.expression(0);
				this.state = 82;
				this.match(fhirpathParser.T__28);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, fhirpathParser.RULE_literal);
		let _la: number;
		try {
			this.state = 95;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				_localctx = new NullLiteralContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 86;
				this.match(fhirpathParser.T__29);
				this.state = 87;
				this.match(fhirpathParser.T__30);
				}
				break;

			case 2:
				_localctx = new BooleanLiteralContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 88;
				_la = this._input.LA(1);
				if (!(_la === fhirpathParser.T__31 || _la === fhirpathParser.T__32)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;

			case 3:
				_localctx = new StringLiteralContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 89;
				this.match(fhirpathParser.STRING);
				}
				break;

			case 4:
				_localctx = new NumberLiteralContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 90;
				this.match(fhirpathParser.NUMBER);
				}
				break;

			case 5:
				_localctx = new DateLiteralContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 91;
				this.match(fhirpathParser.DATE);
				}
				break;

			case 6:
				_localctx = new DateTimeLiteralContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 92;
				this.match(fhirpathParser.DATETIME);
				}
				break;

			case 7:
				_localctx = new TimeLiteralContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 93;
				this.match(fhirpathParser.TIME);
				}
				break;

			case 8:
				_localctx = new QuantityLiteralContext(_localctx);
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 94;
				this.quantity();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public externalConstant(): ExternalConstantContext {
		let _localctx: ExternalConstantContext = new ExternalConstantContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, fhirpathParser.RULE_externalConstant);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 97;
			this.match(fhirpathParser.T__33);
			this.state = 100;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case fhirpathParser.T__10:
			case fhirpathParser.T__11:
			case fhirpathParser.T__21:
			case fhirpathParser.T__22:
			case fhirpathParser.IDENTIFIER:
			case fhirpathParser.DELIMITEDIDENTIFIER:
				{
				this.state = 98;
				this.identifier();
				}
				break;
			case fhirpathParser.STRING:
				{
				this.state = 99;
				this.match(fhirpathParser.STRING);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public invocation(): InvocationContext {
		let _localctx: InvocationContext = new InvocationContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, fhirpathParser.RULE_invocation);
		try {
			this.state = 107;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				_localctx = new MemberInvocationContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 102;
				this.identifier();
				}
				break;

			case 2:
				_localctx = new FunctionInvocationContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 103;
				this.function();
				}
				break;

			case 3:
				_localctx = new ThisInvocationContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 104;
				this.match(fhirpathParser.T__34);
				}
				break;

			case 4:
				_localctx = new IndexInvocationContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 105;
				this.match(fhirpathParser.T__35);
				}
				break;

			case 5:
				_localctx = new TotalInvocationContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 106;
				this.match(fhirpathParser.T__36);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function(): FunctionContext {
		let _localctx: FunctionContext = new FunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, fhirpathParser.RULE_function);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 109;
			this.identifier();
			this.state = 110;
			this.match(fhirpathParser.T__27);
			this.state = 112;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << fhirpathParser.T__3) | (1 << fhirpathParser.T__4) | (1 << fhirpathParser.T__10) | (1 << fhirpathParser.T__11) | (1 << fhirpathParser.T__21) | (1 << fhirpathParser.T__22) | (1 << fhirpathParser.T__27) | (1 << fhirpathParser.T__29))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (fhirpathParser.T__31 - 32)) | (1 << (fhirpathParser.T__32 - 32)) | (1 << (fhirpathParser.T__33 - 32)) | (1 << (fhirpathParser.T__34 - 32)) | (1 << (fhirpathParser.T__35 - 32)) | (1 << (fhirpathParser.T__36 - 32)) | (1 << (fhirpathParser.DATE - 32)) | (1 << (fhirpathParser.DATETIME - 32)) | (1 << (fhirpathParser.TIME - 32)) | (1 << (fhirpathParser.IDENTIFIER - 32)) | (1 << (fhirpathParser.DELIMITEDIDENTIFIER - 32)) | (1 << (fhirpathParser.STRING - 32)) | (1 << (fhirpathParser.NUMBER - 32)))) !== 0)) {
				{
				this.state = 111;
				this.paramList();
				}
			}

			this.state = 114;
			this.match(fhirpathParser.T__28);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paramList(): ParamListContext {
		let _localctx: ParamListContext = new ParamListContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, fhirpathParser.RULE_paramList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 116;
			this.expression(0);
			this.state = 121;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === fhirpathParser.T__37) {
				{
				{
				this.state = 117;
				this.match(fhirpathParser.T__37);
				this.state = 118;
				this.expression(0);
				}
				}
				this.state = 123;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public quantity(): QuantityContext {
		let _localctx: QuantityContext = new QuantityContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, fhirpathParser.RULE_quantity);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 124;
			this.match(fhirpathParser.NUMBER);
			this.state = 126;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 125;
				this.unit();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unit(): UnitContext {
		let _localctx: UnitContext = new UnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, fhirpathParser.RULE_unit);
		try {
			this.state = 131;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case fhirpathParser.T__38:
			case fhirpathParser.T__39:
			case fhirpathParser.T__40:
			case fhirpathParser.T__41:
			case fhirpathParser.T__42:
			case fhirpathParser.T__43:
			case fhirpathParser.T__44:
			case fhirpathParser.T__45:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 128;
				this.dateTimePrecision();
				}
				break;
			case fhirpathParser.T__46:
			case fhirpathParser.T__47:
			case fhirpathParser.T__48:
			case fhirpathParser.T__49:
			case fhirpathParser.T__50:
			case fhirpathParser.T__51:
			case fhirpathParser.T__52:
			case fhirpathParser.T__53:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 129;
				this.pluralDateTimePrecision();
				}
				break;
			case fhirpathParser.STRING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 130;
				this.match(fhirpathParser.STRING);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dateTimePrecision(): DateTimePrecisionContext {
		let _localctx: DateTimePrecisionContext = new DateTimePrecisionContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, fhirpathParser.RULE_dateTimePrecision);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 133;
			_la = this._input.LA(1);
			if (!(((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & ((1 << (fhirpathParser.T__38 - 39)) | (1 << (fhirpathParser.T__39 - 39)) | (1 << (fhirpathParser.T__40 - 39)) | (1 << (fhirpathParser.T__41 - 39)) | (1 << (fhirpathParser.T__42 - 39)) | (1 << (fhirpathParser.T__43 - 39)) | (1 << (fhirpathParser.T__44 - 39)) | (1 << (fhirpathParser.T__45 - 39)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pluralDateTimePrecision(): PluralDateTimePrecisionContext {
		let _localctx: PluralDateTimePrecisionContext = new PluralDateTimePrecisionContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, fhirpathParser.RULE_pluralDateTimePrecision);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 135;
			_la = this._input.LA(1);
			if (!(((((_la - 47)) & ~0x1F) === 0 && ((1 << (_la - 47)) & ((1 << (fhirpathParser.T__46 - 47)) | (1 << (fhirpathParser.T__47 - 47)) | (1 << (fhirpathParser.T__48 - 47)) | (1 << (fhirpathParser.T__49 - 47)) | (1 << (fhirpathParser.T__50 - 47)) | (1 << (fhirpathParser.T__51 - 47)) | (1 << (fhirpathParser.T__52 - 47)) | (1 << (fhirpathParser.T__53 - 47)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeSpecifier(): TypeSpecifierContext {
		let _localctx: TypeSpecifierContext = new TypeSpecifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, fhirpathParser.RULE_typeSpecifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 137;
			this.qualifiedIdentifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		let _localctx: QualifiedIdentifierContext = new QualifiedIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, fhirpathParser.RULE_qualifiedIdentifier);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 139;
			this.identifier();
			this.state = 144;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 140;
					this.match(fhirpathParser.T__0);
					this.state = 141;
					this.identifier();
					}
					}
				}
				this.state = 146;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, fhirpathParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 147;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << fhirpathParser.T__10) | (1 << fhirpathParser.T__11) | (1 << fhirpathParser.T__21) | (1 << fhirpathParser.T__22))) !== 0) || _la === fhirpathParser.IDENTIFIER || _la === fhirpathParser.DELIMITEDIDENTIFIER)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 0:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 10);

		case 1:
			return this.precpred(this._ctx, 9);

		case 2:
			return this.precpred(this._ctx, 7);

		case 3:
			return this.precpred(this._ctx, 6);

		case 4:
			return this.precpred(this._ctx, 5);

		case 5:
			return this.precpred(this._ctx, 4);

		case 6:
			return this.precpred(this._ctx, 3);

		case 7:
			return this.precpred(this._ctx, 2);

		case 8:
			return this.precpred(this._ctx, 1);

		case 9:
			return this.precpred(this._ctx, 13);

		case 10:
			return this.precpred(this._ctx, 12);

		case 11:
			return this.precpred(this._ctx, 8);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03B\x98\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02#\n\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x07\x02K\n\x02\f\x02\x0E\x02N\v\x02\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03W\n\x03\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04b\n\x04\x03" +
		"\x05\x03\x05\x03\x05\x05\x05g\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x05\x06n\n\x06\x03\x07\x03\x07\x03\x07\x05\x07s\n\x07\x03\x07\x03" +
		"\x07\x03\b\x03\b\x03\b\x07\bz\n\b\f\b\x0E\b}\v\b\x03\t\x03\t\x05\t\x81" +
		"\n\t\x03\n\x03\n\x03\n\x05\n\x86\n\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03" +
		"\r\x03\x0E\x03\x0E\x03\x0E\x07\x0E\x91\n\x0E\f\x0E\x0E\x0E\x94\v\x0E\x03" +
		"\x0F\x03\x0F\x03\x0F\x02\x02\x03\x02\x10\x02\x02\x04\x02\x06\x02\b\x02" +
		"\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C" +
		"\x02\x02\x0E\x03\x02\x06\x07\x03\x02\b\v\x04\x02\x06\x07\f\f\x03\x02\x10" +
		"\x13\x03\x02\x14\x17\x03\x02\x18\x19\x03\x02\x1B\x1C\x03\x02\r\x0E\x03" +
		"\x02\"#\x03\x02)0\x03\x0218\x05\x02\r\x0E\x18\x19<=\x02\xAB\x02\"\x03" +
		"\x02\x02\x02\x04V\x03\x02\x02\x02\x06a\x03\x02\x02\x02\bc\x03\x02\x02" +
		"\x02\nm\x03\x02\x02\x02\fo\x03\x02\x02\x02\x0Ev\x03\x02\x02\x02\x10~\x03" +
		"\x02\x02\x02\x12\x85\x03\x02\x02\x02\x14\x87\x03\x02\x02\x02\x16\x89\x03" +
		"\x02\x02\x02\x18\x8B\x03\x02\x02\x02\x1A\x8D\x03\x02\x02\x02\x1C\x95\x03" +
		"\x02\x02\x02\x1E\x1F\b\x02\x01\x02\x1F#\x05\x04\x03\x02 !\t\x02\x02\x02" +
		"!#\x05\x02\x02\r\"\x1E\x03\x02\x02\x02\" \x03\x02\x02\x02#L\x03\x02\x02" +
		"\x02$%\f\f\x02\x02%&\t\x03\x02\x02&K\x05\x02\x02\r\'(\f\v\x02\x02()\t" +
		"\x04\x02\x02)K\x05\x02\x02\f*+\f\t\x02\x02+,\x07\x0F\x02\x02,K\x05\x02" +
		"\x02\n-.\f\b\x02\x02./\t\x05\x02\x02/K\x05\x02\x02\t01\f\x07\x02\x021" +
		"2\t\x06\x02\x022K\x05\x02\x02\b34\f\x06\x02\x0245\t\x07\x02\x025K\x05" +
		"\x02\x02\x0767\f\x05\x02\x0278\x07\x1A\x02\x028K\x05\x02\x02\x069:\f\x04" +
		"\x02\x02:;\t\b\x02\x02;K\x05\x02\x02\x05<=\f\x03\x02\x02=>\x07\x1D\x02" +
		"\x02>K\x05\x02\x02\x04?@\f\x0F\x02\x02@A\x07\x03\x02\x02AK\x05\n\x06\x02" +
		"BC\f\x0E\x02\x02CD\x07\x04\x02\x02DE\x05\x02\x02\x02EF\x07\x05\x02\x02" +
		"FK\x03\x02\x02\x02GH\f\n\x02\x02HI\t\t\x02\x02IK\x05\x18\r\x02J$\x03\x02" +
		"\x02\x02J\'\x03\x02\x02\x02J*\x03\x02\x02\x02J-\x03\x02\x02\x02J0\x03" +
		"\x02\x02\x02J3\x03\x02\x02\x02J6\x03\x02\x02\x02J9\x03\x02\x02\x02J<\x03" +
		"\x02\x02\x02J?\x03\x02\x02\x02JB\x03\x02\x02\x02JG\x03\x02\x02\x02KN\x03" +
		"\x02\x02\x02LJ\x03\x02\x02\x02LM\x03\x02\x02\x02M\x03\x03\x02\x02\x02" +
		"NL\x03\x02\x02\x02OW\x05\n\x06\x02PW\x05\x06\x04\x02QW\x05\b\x05\x02R" +
		"S\x07\x1E\x02\x02ST\x05\x02\x02\x02TU\x07\x1F\x02\x02UW\x03\x02\x02\x02" +
		"VO\x03\x02\x02\x02VP\x03\x02\x02\x02VQ\x03\x02\x02\x02VR\x03\x02\x02\x02" +
		"W\x05\x03\x02\x02\x02XY\x07 \x02\x02Yb\x07!\x02\x02Zb\t\n\x02\x02[b\x07" +
		">\x02\x02\\b\x07?\x02\x02]b\x079\x02\x02^b\x07:\x02\x02_b\x07;\x02\x02" +
		"`b\x05\x10\t\x02aX\x03\x02\x02\x02aZ\x03\x02\x02\x02a[\x03\x02\x02\x02" +
		"a\\\x03\x02\x02\x02a]\x03\x02\x02\x02a^\x03\x02\x02\x02a_\x03\x02\x02" +
		"\x02a`\x03\x02\x02\x02b\x07\x03\x02\x02\x02cf\x07$\x02\x02dg\x05\x1C\x0F" +
		"\x02eg\x07>\x02\x02fd\x03\x02\x02\x02fe\x03\x02\x02\x02g\t\x03\x02\x02" +
		"\x02hn\x05\x1C\x0F\x02in\x05\f\x07\x02jn\x07%\x02\x02kn\x07&\x02\x02l" +
		"n\x07\'\x02\x02mh\x03\x02\x02\x02mi\x03\x02\x02\x02mj\x03\x02\x02\x02" +
		"mk\x03\x02\x02\x02ml\x03\x02\x02\x02n\v\x03\x02\x02\x02op\x05\x1C\x0F" +
		"\x02pr\x07\x1E\x02\x02qs\x05\x0E\b\x02rq\x03\x02\x02\x02rs\x03\x02\x02" +
		"\x02st\x03\x02\x02\x02tu\x07\x1F\x02\x02u\r\x03\x02\x02\x02v{\x05\x02" +
		"\x02\x02wx\x07(\x02\x02xz\x05\x02\x02\x02yw\x03\x02\x02\x02z}\x03\x02" +
		"\x02\x02{y\x03\x02\x02\x02{|\x03\x02\x02\x02|\x0F\x03\x02\x02\x02}{\x03" +
		"\x02\x02\x02~\x80\x07?\x02\x02\x7F\x81\x05\x12\n\x02\x80\x7F\x03\x02\x02" +
		"\x02\x80\x81\x03\x02\x02\x02\x81\x11\x03\x02\x02\x02\x82\x86\x05\x14\v" +
		"\x02\x83\x86\x05\x16\f\x02\x84\x86\x07>\x02\x02\x85\x82\x03\x02\x02\x02" +
		"\x85\x83\x03\x02\x02\x02\x85\x84\x03\x02\x02\x02\x86\x13\x03\x02\x02\x02" +
		"\x87\x88\t\v\x02\x02\x88\x15\x03\x02\x02\x02\x89\x8A\t\f\x02\x02\x8A\x17" +
		"\x03\x02\x02\x02\x8B\x8C\x05\x1A\x0E\x02\x8C\x19\x03\x02\x02\x02\x8D\x92" +
		"\x05\x1C\x0F\x02\x8E\x8F\x07\x03\x02\x02\x8F\x91\x05\x1C\x0F\x02\x90\x8E" +
		"\x03\x02\x02\x02\x91\x94\x03\x02\x02\x02\x92\x90\x03\x02\x02\x02\x92\x93" +
		"\x03\x02\x02\x02\x93\x1B\x03\x02\x02\x02\x94\x92\x03\x02\x02\x02\x95\x96" +
		"\t\r\x02\x02\x96\x1D\x03\x02\x02\x02\x0E\"JLVafmr{\x80\x85\x92";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!fhirpathParser.__ATN) {
			fhirpathParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(fhirpathParser._serializedATN));
		}

		return fhirpathParser.__ATN;
	}

}

export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class TermExpressionContext extends ExpressionContext {
	public term(): TermContext {
		return this.getRuleContext(0, TermContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterTermExpression) {
			listener.enterTermExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitTermExpression) {
			listener.exitTermExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTermExpression) {
			return visitor.visitTermExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InvocationExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public invocation(): InvocationContext {
		return this.getRuleContext(0, InvocationContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterInvocationExpression) {
			listener.enterInvocationExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitInvocationExpression) {
			listener.exitInvocationExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitInvocationExpression) {
			return visitor.visitInvocationExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexerExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterIndexerExpression) {
			listener.enterIndexerExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitIndexerExpression) {
			listener.exitIndexerExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitIndexerExpression) {
			return visitor.visitIndexerExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PolarityExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterPolarityExpression) {
			listener.enterPolarityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitPolarityExpression) {
			listener.exitPolarityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitPolarityExpression) {
			return visitor.visitPolarityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicativeExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterMultiplicativeExpression) {
			listener.enterMultiplicativeExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitMultiplicativeExpression) {
			listener.exitMultiplicativeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) {
			return visitor.visitMultiplicativeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditiveExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterAdditiveExpression) {
			listener.enterAdditiveExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitAdditiveExpression) {
			listener.exitAdditiveExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitAdditiveExpression) {
			return visitor.visitAdditiveExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getRuleContext(0, TypeSpecifierContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterTypeExpression) {
			listener.enterTypeExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitTypeExpression) {
			listener.exitTypeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTypeExpression) {
			return visitor.visitTypeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnionExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterUnionExpression) {
			listener.enterUnionExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitUnionExpression) {
			listener.exitUnionExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitUnionExpression) {
			return visitor.visitUnionExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InequalityExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterInequalityExpression) {
			listener.enterInequalityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitInequalityExpression) {
			listener.exitInequalityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitInequalityExpression) {
			return visitor.visitInequalityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualityExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterEqualityExpression) {
			listener.enterEqualityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitEqualityExpression) {
			listener.exitEqualityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitEqualityExpression) {
			return visitor.visitEqualityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MembershipExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterMembershipExpression) {
			listener.enterMembershipExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitMembershipExpression) {
			listener.exitMembershipExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitMembershipExpression) {
			return visitor.visitMembershipExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterAndExpression) {
			listener.enterAndExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitAndExpression) {
			listener.exitAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitAndExpression) {
			return visitor.visitAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterOrExpression) {
			listener.enterOrExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitOrExpression) {
			listener.exitOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitOrExpression) {
			return visitor.visitOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImpliesExpressionContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterImpliesExpression) {
			listener.enterImpliesExpression(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitImpliesExpression) {
			listener.exitImpliesExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitImpliesExpression) {
			return visitor.visitImpliesExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TermContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_term; }
	public copyFrom(ctx: TermContext): void {
		super.copyFrom(ctx);
	}
}
export class InvocationTermContext extends TermContext {
	public invocation(): InvocationContext {
		return this.getRuleContext(0, InvocationContext);
	}
	constructor(ctx: TermContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterInvocationTerm) {
			listener.enterInvocationTerm(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitInvocationTerm) {
			listener.exitInvocationTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitInvocationTerm) {
			return visitor.visitInvocationTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralTermContext extends TermContext {
	public literal(): LiteralContext {
		return this.getRuleContext(0, LiteralContext);
	}
	constructor(ctx: TermContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterLiteralTerm) {
			listener.enterLiteralTerm(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitLiteralTerm) {
			listener.exitLiteralTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitLiteralTerm) {
			return visitor.visitLiteralTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExternalConstantTermContext extends TermContext {
	public externalConstant(): ExternalConstantContext {
		return this.getRuleContext(0, ExternalConstantContext);
	}
	constructor(ctx: TermContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterExternalConstantTerm) {
			listener.enterExternalConstantTerm(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitExternalConstantTerm) {
			listener.exitExternalConstantTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitExternalConstantTerm) {
			return visitor.visitExternalConstantTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesizedTermContext extends TermContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: TermContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterParenthesizedTerm) {
			listener.enterParenthesizedTerm(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitParenthesizedTerm) {
			listener.exitParenthesizedTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitParenthesizedTerm) {
			return visitor.visitParenthesizedTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_literal; }
	public copyFrom(ctx: LiteralContext): void {
		super.copyFrom(ctx);
	}
}
export class NullLiteralContext extends LiteralContext {
	constructor(ctx: LiteralContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterNullLiteral) {
			listener.enterNullLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitNullLiteral) {
			listener.exitNullLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitNullLiteral) {
			return visitor.visitNullLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanLiteralContext extends LiteralContext {
	constructor(ctx: LiteralContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterBooleanLiteral) {
			listener.enterBooleanLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitBooleanLiteral) {
			listener.exitBooleanLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitBooleanLiteral) {
			return visitor.visitBooleanLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringLiteralContext extends LiteralContext {
	public STRING(): TerminalNode { return this.getToken(fhirpathParser.STRING, 0); }
	constructor(ctx: LiteralContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterStringLiteral) {
			listener.enterStringLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitStringLiteral) {
			listener.exitStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberLiteralContext extends LiteralContext {
	public NUMBER(): TerminalNode { return this.getToken(fhirpathParser.NUMBER, 0); }
	constructor(ctx: LiteralContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterNumberLiteral) {
			listener.enterNumberLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitNumberLiteral) {
			listener.exitNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitNumberLiteral) {
			return visitor.visitNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateLiteralContext extends LiteralContext {
	public DATE(): TerminalNode { return this.getToken(fhirpathParser.DATE, 0); }
	constructor(ctx: LiteralContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterDateLiteral) {
			listener.enterDateLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitDateLiteral) {
			listener.exitDateLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitDateLiteral) {
			return visitor.visitDateLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateTimeLiteralContext extends LiteralContext {
	public DATETIME(): TerminalNode { return this.getToken(fhirpathParser.DATETIME, 0); }
	constructor(ctx: LiteralContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterDateTimeLiteral) {
			listener.enterDateTimeLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitDateTimeLiteral) {
			listener.exitDateTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitDateTimeLiteral) {
			return visitor.visitDateTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TimeLiteralContext extends LiteralContext {
	public TIME(): TerminalNode { return this.getToken(fhirpathParser.TIME, 0); }
	constructor(ctx: LiteralContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterTimeLiteral) {
			listener.enterTimeLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitTimeLiteral) {
			listener.exitTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTimeLiteral) {
			return visitor.visitTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QuantityLiteralContext extends LiteralContext {
	public quantity(): QuantityContext {
		return this.getRuleContext(0, QuantityContext);
	}
	constructor(ctx: LiteralContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterQuantityLiteral) {
			listener.enterQuantityLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitQuantityLiteral) {
			listener.exitQuantityLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitQuantityLiteral) {
			return visitor.visitQuantityLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternalConstantContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(fhirpathParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_externalConstant; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterExternalConstant) {
			listener.enterExternalConstant(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitExternalConstant) {
			listener.exitExternalConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitExternalConstant) {
			return visitor.visitExternalConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InvocationContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_invocation; }
	public copyFrom(ctx: InvocationContext): void {
		super.copyFrom(ctx);
	}
}
export class MemberInvocationContext extends InvocationContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(ctx: InvocationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterMemberInvocation) {
			listener.enterMemberInvocation(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitMemberInvocation) {
			listener.exitMemberInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitMemberInvocation) {
			return visitor.visitMemberInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionInvocationContext extends InvocationContext {
	public function(): FunctionContext {
		return this.getRuleContext(0, FunctionContext);
	}
	constructor(ctx: InvocationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterFunctionInvocation) {
			listener.enterFunctionInvocation(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitFunctionInvocation) {
			listener.exitFunctionInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitFunctionInvocation) {
			return visitor.visitFunctionInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ThisInvocationContext extends InvocationContext {
	constructor(ctx: InvocationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterThisInvocation) {
			listener.enterThisInvocation(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitThisInvocation) {
			listener.exitThisInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitThisInvocation) {
			return visitor.visitThisInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexInvocationContext extends InvocationContext {
	constructor(ctx: InvocationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterIndexInvocation) {
			listener.enterIndexInvocation(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitIndexInvocation) {
			listener.exitIndexInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitIndexInvocation) {
			return visitor.visitIndexInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TotalInvocationContext extends InvocationContext {
	constructor(ctx: InvocationContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterTotalInvocation) {
			listener.enterTotalInvocation(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitTotalInvocation) {
			listener.exitTotalInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTotalInvocation) {
			return visitor.visitTotalInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public paramList(): ParamListContext | undefined {
		return this.tryGetRuleContext(0, ParamListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_function; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterFunction) {
			listener.enterFunction(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitFunction) {
			listener.exitFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitFunction) {
			return visitor.visitFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamListContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_paramList; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterParamList) {
			listener.enterParamList(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitParamList) {
			listener.exitParamList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitParamList) {
			return visitor.visitParamList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuantityContext extends ParserRuleContext {
	public NUMBER(): TerminalNode { return this.getToken(fhirpathParser.NUMBER, 0); }
	public unit(): UnitContext | undefined {
		return this.tryGetRuleContext(0, UnitContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_quantity; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterQuantity) {
			listener.enterQuantity(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitQuantity) {
			listener.exitQuantity(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitQuantity) {
			return visitor.visitQuantity(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnitContext extends ParserRuleContext {
	public dateTimePrecision(): DateTimePrecisionContext | undefined {
		return this.tryGetRuleContext(0, DateTimePrecisionContext);
	}
	public pluralDateTimePrecision(): PluralDateTimePrecisionContext | undefined {
		return this.tryGetRuleContext(0, PluralDateTimePrecisionContext);
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(fhirpathParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_unit; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterUnit) {
			listener.enterUnit(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitUnit) {
			listener.exitUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitUnit) {
			return visitor.visitUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateTimePrecisionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_dateTimePrecision; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterDateTimePrecision) {
			listener.enterDateTimePrecision(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitDateTimePrecision) {
			listener.exitDateTimePrecision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitDateTimePrecision) {
			return visitor.visitDateTimePrecision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PluralDateTimePrecisionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_pluralDateTimePrecision; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterPluralDateTimePrecision) {
			listener.enterPluralDateTimePrecision(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitPluralDateTimePrecision) {
			listener.exitPluralDateTimePrecision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitPluralDateTimePrecision) {
			return visitor.visitPluralDateTimePrecision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSpecifierContext extends ParserRuleContext {
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getRuleContext(0, QualifiedIdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_typeSpecifier; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterTypeSpecifier) {
			listener.enterTypeSpecifier(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitTypeSpecifier) {
			listener.exitTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTypeSpecifier) {
			return visitor.visitTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentifierContext extends ParserRuleContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_qualifiedIdentifier; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterQualifiedIdentifier) {
			listener.enterQualifiedIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitQualifiedIdentifier) {
			listener.exitQualifiedIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitQualifiedIdentifier) {
			return visitor.visitQualifiedIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(fhirpathParser.IDENTIFIER, 0); }
	public DELIMITEDIDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(fhirpathParser.DELIMITEDIDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return fhirpathParser.RULE_identifier; }
	// @Override
	public enterRule(listener: fhirpathListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: fhirpathListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


