// Generated from fhirpath.g4 by ANTLR 4.13.1

import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { fhirpathListener } from "./fhirpathListener.js";
import { fhirpathVisitor } from "./fhirpathVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class fhirpathParser extends antlr.Parser {
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
    public static readonly T__54 = 55;
    public static readonly DATE = 56;
    public static readonly DATETIME = 57;
    public static readonly TIME = 58;
    public static readonly IDENTIFIER = 59;
    public static readonly DELIMITEDIDENTIFIER = 60;
    public static readonly STRING = 61;
    public static readonly NUMBER = 62;
    public static readonly LONGNUMBER = 63;
    public static readonly WS = 64;
    public static readonly COMMENT = 65;
    public static readonly LINE_COMMENT = 66;
    public static readonly RULE_entireExpression = 0;
    public static readonly RULE_expression = 1;
    public static readonly RULE_term = 2;
    public static readonly RULE_literal = 3;
    public static readonly RULE_externalConstant = 4;
    public static readonly RULE_invocation = 5;
    public static readonly RULE_function = 6;
    public static readonly RULE_paramList = 7;
    public static readonly RULE_quantity = 8;
    public static readonly RULE_unit = 9;
    public static readonly RULE_dateTimePrecision = 10;
    public static readonly RULE_pluralDateTimePrecision = 11;
    public static readonly RULE_typeSpecifier = 12;
    public static readonly RULE_qualifiedIdentifier = 13;
    public static readonly RULE_identifier = 14;

    public static readonly literalNames = [
        null, "'.'", "'['", "']'", "'+'", "'-'", "'*'", "'/'", "'div'", 
        "'mod'", "'&'", "'is'", "'as'", "'|'", "'<='", "'<'", "'>'", "'>='", 
        "'='", "'~'", "'!='", "'!~'", "'in'", "'contains'", "'and'", "'or'", 
        "'xor'", "'implies'", "'=>'", "'('", "')'", "'{'", "'}'", "'true'", 
        "'false'", "'%'", "'$this'", "'$index'", "'$total'", "','", "'year'", 
        "'month'", "'week'", "'day'", "'hour'", "'minute'", "'second'", 
        "'millisecond'", "'years'", "'months'", "'weeks'", "'days'", "'hours'", 
        "'minutes'", "'seconds'", "'milliseconds'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, "DATE", "DATETIME", "TIME", "IDENTIFIER", "DELIMITEDIDENTIFIER", 
        "STRING", "NUMBER", "LONGNUMBER", "WS", "COMMENT", "LINE_COMMENT"
    ];
    public static readonly ruleNames = [
        "entireExpression", "expression", "term", "literal", "externalConstant", 
        "invocation", "function", "paramList", "quantity", "unit", "dateTimePrecision", 
        "pluralDateTimePrecision", "typeSpecifier", "qualifiedIdentifier", 
        "identifier",
    ];

    public get grammarFileName(): string { return "fhirpath.g4"; }
    public get literalNames(): (string | null)[] { return fhirpathParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return fhirpathParser.symbolicNames; }
    public get ruleNames(): string[] { return fhirpathParser.ruleNames; }
    public get serializedATN(): number[] { return fhirpathParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, fhirpathParser._ATN, fhirpathParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public entireExpression(): EntireExpressionContext {
        let localContext = new EntireExpressionContext(this.context, this.state);
        this.enterRule(localContext, 0, fhirpathParser.RULE_entireExpression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 30;
            this.expression(0);
            this.state = 31;
            this.match(fhirpathParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expression(): ExpressionContext;
    public expression(_p: number): ExpressionContext;
    public expression(_p?: number): ExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 2;
        this.enterRecursionRule(localContext, 2, fhirpathParser.RULE_expression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 42;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
            case 1:
                {
                localContext = new TermExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 34;
                this.term();
                }
                break;
            case 2:
                {
                localContext = new PolarityExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 35;
                _la = this.tokenStream.LA(1);
                if(!(_la === 4 || _la === 5)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 36;
                this.expression(12);
                }
                break;
            case 3:
                {
                localContext = new LambdaExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 38;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 12589056) !== 0) || _la === 59 || _la === 60) {
                    {
                    this.state = 37;
                    this.identifier();
                    }
                }

                this.state = 40;
                this.match(fhirpathParser.T__27);
                this.state = 41;
                this.expression(1);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 84;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 3, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 82;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 2, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplicativeExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 44;
                        if (!(this.precpred(this.context, 11))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 11)");
                        }
                        this.state = 45;
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 960) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 46;
                        this.expression(12);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditiveExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 47;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 48;
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1072) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 49;
                        this.expression(11);
                        }
                        break;
                    case 3:
                        {
                        localContext = new UnionExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 50;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 51;
                        this.match(fhirpathParser.T__12);
                        this.state = 52;
                        this.expression(9);
                        }
                        break;
                    case 4:
                        {
                        localContext = new InequalityExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 53;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        this.state = 54;
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 245760) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 55;
                        this.expression(8);
                        }
                        break;
                    case 5:
                        {
                        localContext = new EqualityExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 56;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 57;
                        _la = this.tokenStream.LA(1);
                        if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3932160) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 58;
                        this.expression(7);
                        }
                        break;
                    case 6:
                        {
                        localContext = new MembershipExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 59;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 60;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 22 || _la === 23)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 61;
                        this.expression(6);
                        }
                        break;
                    case 7:
                        {
                        localContext = new AndExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 62;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 63;
                        this.match(fhirpathParser.T__23);
                        this.state = 64;
                        this.expression(5);
                        }
                        break;
                    case 8:
                        {
                        localContext = new OrExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 65;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        this.state = 66;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 25 || _la === 26)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 67;
                        this.expression(4);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ImpliesExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 68;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 69;
                        this.match(fhirpathParser.T__26);
                        this.state = 70;
                        this.expression(3);
                        }
                        break;
                    case 10:
                        {
                        localContext = new InvocationExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 71;
                        if (!(this.precpred(this.context, 14))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 14)");
                        }
                        this.state = 72;
                        this.match(fhirpathParser.T__0);
                        this.state = 73;
                        this.invocation();
                        }
                        break;
                    case 11:
                        {
                        localContext = new IndexerExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 74;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 75;
                        this.match(fhirpathParser.T__1);
                        this.state = 76;
                        this.expression(0);
                        this.state = 77;
                        this.match(fhirpathParser.T__2);
                        }
                        break;
                    case 12:
                        {
                        localContext = new TypeExpressionContext(new ExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, fhirpathParser.RULE_expression);
                        this.state = 79;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 80;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 11 || _la === 12)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 81;
                        this.typeSpecifier();
                        }
                        break;
                    }
                    }
                }
                this.state = 86;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 3, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public term(): TermContext {
        let localContext = new TermContext(this.context, this.state);
        this.enterRule(localContext, 4, fhirpathParser.RULE_term);
        try {
            this.state = 94;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case fhirpathParser.T__10:
            case fhirpathParser.T__11:
            case fhirpathParser.T__21:
            case fhirpathParser.T__22:
            case fhirpathParser.T__35:
            case fhirpathParser.T__36:
            case fhirpathParser.T__37:
            case fhirpathParser.IDENTIFIER:
            case fhirpathParser.DELIMITEDIDENTIFIER:
                localContext = new InvocationTermContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 87;
                this.invocation();
                }
                break;
            case fhirpathParser.T__30:
            case fhirpathParser.T__32:
            case fhirpathParser.T__33:
            case fhirpathParser.DATE:
            case fhirpathParser.DATETIME:
            case fhirpathParser.TIME:
            case fhirpathParser.STRING:
            case fhirpathParser.NUMBER:
            case fhirpathParser.LONGNUMBER:
                localContext = new LiteralTermContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 88;
                this.literal();
                }
                break;
            case fhirpathParser.T__34:
                localContext = new ExternalConstantTermContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 89;
                this.externalConstant();
                }
                break;
            case fhirpathParser.T__28:
                localContext = new ParenthesizedTermContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 90;
                this.match(fhirpathParser.T__28);
                this.state = 91;
                this.expression(0);
                this.state = 92;
                this.match(fhirpathParser.T__29);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 6, fhirpathParser.RULE_literal);
        let _la: number;
        try {
            this.state = 106;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
            case 1:
                localContext = new NullLiteralContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 96;
                this.match(fhirpathParser.T__30);
                this.state = 97;
                this.match(fhirpathParser.T__31);
                }
                break;
            case 2:
                localContext = new BooleanLiteralContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 98;
                _la = this.tokenStream.LA(1);
                if(!(_la === 33 || _la === 34)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            case 3:
                localContext = new StringLiteralContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 99;
                this.match(fhirpathParser.STRING);
                }
                break;
            case 4:
                localContext = new NumberLiteralContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 100;
                this.match(fhirpathParser.NUMBER);
                }
                break;
            case 5:
                localContext = new LongNumberLiteralContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 101;
                this.match(fhirpathParser.LONGNUMBER);
                }
                break;
            case 6:
                localContext = new DateLiteralContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 102;
                this.match(fhirpathParser.DATE);
                }
                break;
            case 7:
                localContext = new DateTimeLiteralContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 103;
                this.match(fhirpathParser.DATETIME);
                }
                break;
            case 8:
                localContext = new TimeLiteralContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 104;
                this.match(fhirpathParser.TIME);
                }
                break;
            case 9:
                localContext = new QuantityLiteralContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 105;
                this.quantity();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public externalConstant(): ExternalConstantContext {
        let localContext = new ExternalConstantContext(this.context, this.state);
        this.enterRule(localContext, 8, fhirpathParser.RULE_externalConstant);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 108;
            this.match(fhirpathParser.T__34);
            this.state = 111;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case fhirpathParser.T__10:
            case fhirpathParser.T__11:
            case fhirpathParser.T__21:
            case fhirpathParser.T__22:
            case fhirpathParser.IDENTIFIER:
            case fhirpathParser.DELIMITEDIDENTIFIER:
                {
                this.state = 109;
                this.identifier();
                }
                break;
            case fhirpathParser.STRING:
                {
                this.state = 110;
                this.match(fhirpathParser.STRING);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public invocation(): InvocationContext {
        let localContext = new InvocationContext(this.context, this.state);
        this.enterRule(localContext, 10, fhirpathParser.RULE_invocation);
        try {
            this.state = 118;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
            case 1:
                localContext = new MemberInvocationContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 113;
                this.identifier();
                }
                break;
            case 2:
                localContext = new FunctionInvocationContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 114;
                this.function_();
                }
                break;
            case 3:
                localContext = new ThisInvocationContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 115;
                this.match(fhirpathParser.T__35);
                }
                break;
            case 4:
                localContext = new IndexInvocationContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 116;
                this.match(fhirpathParser.T__36);
                }
                break;
            case 5:
                localContext = new TotalInvocationContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 117;
                this.match(fhirpathParser.T__37);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_(): FunctionContext {
        let localContext = new FunctionContext(this.context, this.state);
        this.enterRule(localContext, 12, fhirpathParser.RULE_function);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 120;
            this.identifier();
            this.state = 121;
            this.match(fhirpathParser.T__28);
            this.state = 123;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2965379120) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2139095103) !== 0)) {
                {
                this.state = 122;
                this.paramList();
                }
            }

            this.state = 125;
            this.match(fhirpathParser.T__29);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public paramList(): ParamListContext {
        let localContext = new ParamListContext(this.context, this.state);
        this.enterRule(localContext, 14, fhirpathParser.RULE_paramList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 127;
            this.expression(0);
            this.state = 132;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 39) {
                {
                {
                this.state = 128;
                this.match(fhirpathParser.T__38);
                this.state = 129;
                this.expression(0);
                }
                }
                this.state = 134;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public quantity(): QuantityContext {
        let localContext = new QuantityContext(this.context, this.state);
        this.enterRule(localContext, 16, fhirpathParser.RULE_quantity);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 135;
            this.match(fhirpathParser.NUMBER);
            this.state = 137;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 10, this.context) ) {
            case 1:
                {
                this.state = 136;
                this.unit();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public unit(): UnitContext {
        let localContext = new UnitContext(this.context, this.state);
        this.enterRule(localContext, 18, fhirpathParser.RULE_unit);
        try {
            this.state = 142;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case fhirpathParser.T__39:
            case fhirpathParser.T__40:
            case fhirpathParser.T__41:
            case fhirpathParser.T__42:
            case fhirpathParser.T__43:
            case fhirpathParser.T__44:
            case fhirpathParser.T__45:
            case fhirpathParser.T__46:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 139;
                this.dateTimePrecision();
                }
                break;
            case fhirpathParser.T__47:
            case fhirpathParser.T__48:
            case fhirpathParser.T__49:
            case fhirpathParser.T__50:
            case fhirpathParser.T__51:
            case fhirpathParser.T__52:
            case fhirpathParser.T__53:
            case fhirpathParser.T__54:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 140;
                this.pluralDateTimePrecision();
                }
                break;
            case fhirpathParser.STRING:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 141;
                this.match(fhirpathParser.STRING);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dateTimePrecision(): DateTimePrecisionContext {
        let localContext = new DateTimePrecisionContext(this.context, this.state);
        this.enterRule(localContext, 20, fhirpathParser.RULE_dateTimePrecision);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 144;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 255) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pluralDateTimePrecision(): PluralDateTimePrecisionContext {
        let localContext = new PluralDateTimePrecisionContext(this.context, this.state);
        this.enterRule(localContext, 22, fhirpathParser.RULE_pluralDateTimePrecision);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 146;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 255) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeSpecifier(): TypeSpecifierContext {
        let localContext = new TypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 24, fhirpathParser.RULE_typeSpecifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 148;
            this.qualifiedIdentifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext {
        let localContext = new QualifiedIdentifierContext(this.context, this.state);
        this.enterRule(localContext, 26, fhirpathParser.RULE_qualifiedIdentifier);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 150;
            this.identifier();
            this.state = 155;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 12, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 151;
                    this.match(fhirpathParser.T__0);
                    this.state = 152;
                    this.identifier();
                    }
                    }
                }
                this.state = 157;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 12, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifier(): IdentifierContext {
        let localContext = new IdentifierContext(this.context, this.state);
        this.enterRule(localContext, 28, fhirpathParser.RULE_identifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 158;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 12589056) !== 0) || _la === 59 || _la === 60)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 1:
            return this.expression_sempred(localContext as ExpressionContext, predIndex);
        }
        return true;
    }
    private expression_sempred(localContext: ExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 11);
        case 1:
            return this.precpred(this.context, 10);
        case 2:
            return this.precpred(this.context, 8);
        case 3:
            return this.precpred(this.context, 7);
        case 4:
            return this.precpred(this.context, 6);
        case 5:
            return this.precpred(this.context, 5);
        case 6:
            return this.precpred(this.context, 4);
        case 7:
            return this.precpred(this.context, 3);
        case 8:
            return this.precpred(this.context, 2);
        case 9:
            return this.precpred(this.context, 14);
        case 10:
            return this.precpred(this.context, 13);
        case 11:
            return this.precpred(this.context, 9);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,66,161,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,3,1,39,8,1,1,1,1,1,3,1,
        43,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,83,8,1,10,1,12,1,86,9,1,1,2,1,
        2,1,2,1,2,1,2,1,2,1,2,3,2,95,8,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
        1,3,1,3,3,3,107,8,3,1,4,1,4,1,4,3,4,112,8,4,1,5,1,5,1,5,1,5,1,5,
        3,5,119,8,5,1,6,1,6,1,6,3,6,124,8,6,1,6,1,6,1,7,1,7,1,7,5,7,131,
        8,7,10,7,12,7,134,9,7,1,8,1,8,3,8,138,8,8,1,9,1,9,1,9,3,9,143,8,
        9,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,13,5,13,154,8,13,10,
        13,12,13,157,9,13,1,14,1,14,1,14,0,1,2,15,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,0,12,1,0,4,5,1,0,6,9,2,0,4,5,10,10,1,0,14,17,1,
        0,18,21,1,0,22,23,1,0,25,26,1,0,11,12,1,0,33,34,1,0,40,47,1,0,48,
        55,3,0,11,12,22,23,59,60,182,0,30,1,0,0,0,2,42,1,0,0,0,4,94,1,0,
        0,0,6,106,1,0,0,0,8,108,1,0,0,0,10,118,1,0,0,0,12,120,1,0,0,0,14,
        127,1,0,0,0,16,135,1,0,0,0,18,142,1,0,0,0,20,144,1,0,0,0,22,146,
        1,0,0,0,24,148,1,0,0,0,26,150,1,0,0,0,28,158,1,0,0,0,30,31,3,2,1,
        0,31,32,5,0,0,1,32,1,1,0,0,0,33,34,6,1,-1,0,34,43,3,4,2,0,35,36,
        7,0,0,0,36,43,3,2,1,12,37,39,3,28,14,0,38,37,1,0,0,0,38,39,1,0,0,
        0,39,40,1,0,0,0,40,41,5,28,0,0,41,43,3,2,1,1,42,33,1,0,0,0,42,35,
        1,0,0,0,42,38,1,0,0,0,43,84,1,0,0,0,44,45,10,11,0,0,45,46,7,1,0,
        0,46,83,3,2,1,12,47,48,10,10,0,0,48,49,7,2,0,0,49,83,3,2,1,11,50,
        51,10,8,0,0,51,52,5,13,0,0,52,83,3,2,1,9,53,54,10,7,0,0,54,55,7,
        3,0,0,55,83,3,2,1,8,56,57,10,6,0,0,57,58,7,4,0,0,58,83,3,2,1,7,59,
        60,10,5,0,0,60,61,7,5,0,0,61,83,3,2,1,6,62,63,10,4,0,0,63,64,5,24,
        0,0,64,83,3,2,1,5,65,66,10,3,0,0,66,67,7,6,0,0,67,83,3,2,1,4,68,
        69,10,2,0,0,69,70,5,27,0,0,70,83,3,2,1,3,71,72,10,14,0,0,72,73,5,
        1,0,0,73,83,3,10,5,0,74,75,10,13,0,0,75,76,5,2,0,0,76,77,3,2,1,0,
        77,78,5,3,0,0,78,83,1,0,0,0,79,80,10,9,0,0,80,81,7,7,0,0,81,83,3,
        24,12,0,82,44,1,0,0,0,82,47,1,0,0,0,82,50,1,0,0,0,82,53,1,0,0,0,
        82,56,1,0,0,0,82,59,1,0,0,0,82,62,1,0,0,0,82,65,1,0,0,0,82,68,1,
        0,0,0,82,71,1,0,0,0,82,74,1,0,0,0,82,79,1,0,0,0,83,86,1,0,0,0,84,
        82,1,0,0,0,84,85,1,0,0,0,85,3,1,0,0,0,86,84,1,0,0,0,87,95,3,10,5,
        0,88,95,3,6,3,0,89,95,3,8,4,0,90,91,5,29,0,0,91,92,3,2,1,0,92,93,
        5,30,0,0,93,95,1,0,0,0,94,87,1,0,0,0,94,88,1,0,0,0,94,89,1,0,0,0,
        94,90,1,0,0,0,95,5,1,0,0,0,96,97,5,31,0,0,97,107,5,32,0,0,98,107,
        7,8,0,0,99,107,5,61,0,0,100,107,5,62,0,0,101,107,5,63,0,0,102,107,
        5,56,0,0,103,107,5,57,0,0,104,107,5,58,0,0,105,107,3,16,8,0,106,
        96,1,0,0,0,106,98,1,0,0,0,106,99,1,0,0,0,106,100,1,0,0,0,106,101,
        1,0,0,0,106,102,1,0,0,0,106,103,1,0,0,0,106,104,1,0,0,0,106,105,
        1,0,0,0,107,7,1,0,0,0,108,111,5,35,0,0,109,112,3,28,14,0,110,112,
        5,61,0,0,111,109,1,0,0,0,111,110,1,0,0,0,112,9,1,0,0,0,113,119,3,
        28,14,0,114,119,3,12,6,0,115,119,5,36,0,0,116,119,5,37,0,0,117,119,
        5,38,0,0,118,113,1,0,0,0,118,114,1,0,0,0,118,115,1,0,0,0,118,116,
        1,0,0,0,118,117,1,0,0,0,119,11,1,0,0,0,120,121,3,28,14,0,121,123,
        5,29,0,0,122,124,3,14,7,0,123,122,1,0,0,0,123,124,1,0,0,0,124,125,
        1,0,0,0,125,126,5,30,0,0,126,13,1,0,0,0,127,132,3,2,1,0,128,129,
        5,39,0,0,129,131,3,2,1,0,130,128,1,0,0,0,131,134,1,0,0,0,132,130,
        1,0,0,0,132,133,1,0,0,0,133,15,1,0,0,0,134,132,1,0,0,0,135,137,5,
        62,0,0,136,138,3,18,9,0,137,136,1,0,0,0,137,138,1,0,0,0,138,17,1,
        0,0,0,139,143,3,20,10,0,140,143,3,22,11,0,141,143,5,61,0,0,142,139,
        1,0,0,0,142,140,1,0,0,0,142,141,1,0,0,0,143,19,1,0,0,0,144,145,7,
        9,0,0,145,21,1,0,0,0,146,147,7,10,0,0,147,23,1,0,0,0,148,149,3,26,
        13,0,149,25,1,0,0,0,150,155,3,28,14,0,151,152,5,1,0,0,152,154,3,
        28,14,0,153,151,1,0,0,0,154,157,1,0,0,0,155,153,1,0,0,0,155,156,
        1,0,0,0,156,27,1,0,0,0,157,155,1,0,0,0,158,159,7,11,0,0,159,29,1,
        0,0,0,13,38,42,82,84,94,106,111,118,123,132,137,142,155
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!fhirpathParser.__ATN) {
            fhirpathParser.__ATN = new antlr.ATNDeserializer().deserialize(fhirpathParser._serializedATN);
        }

        return fhirpathParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(fhirpathParser.literalNames, fhirpathParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return fhirpathParser.vocabulary;
    }

    private static readonly decisionsToDFA = fhirpathParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class EntireExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(fhirpathParser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_entireExpression;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterEntireExpression) {
             listener.enterEntireExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitEntireExpression) {
             listener.exitEntireExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitEntireExpression) {
            return visitor.visitEntireExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_expression;
    }
    public override copyFrom(ctx: ExpressionContext): void {
        super.copyFrom(ctx);
    }
}
export class LambdaExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterLambdaExpression) {
             listener.enterLambdaExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitLambdaExpression) {
             listener.exitLambdaExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitLambdaExpression) {
            return visitor.visitLambdaExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IndexerExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterIndexerExpression) {
             listener.enterIndexerExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitIndexerExpression) {
             listener.exitIndexerExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitIndexerExpression) {
            return visitor.visitIndexerExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class PolarityExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterPolarityExpression) {
             listener.enterPolarityExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitPolarityExpression) {
             listener.exitPolarityExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitPolarityExpression) {
            return visitor.visitPolarityExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AdditiveExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterAdditiveExpression) {
             listener.enterAdditiveExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitAdditiveExpression) {
             listener.exitAdditiveExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitAdditiveExpression) {
            return visitor.visitAdditiveExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MultiplicativeExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterMultiplicativeExpression) {
             listener.enterMultiplicativeExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitMultiplicativeExpression) {
             listener.exitMultiplicativeExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitMultiplicativeExpression) {
            return visitor.visitMultiplicativeExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class UnionExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterUnionExpression) {
             listener.enterUnionExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitUnionExpression) {
             listener.exitUnionExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitUnionExpression) {
            return visitor.visitUnionExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class OrExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterOrExpression) {
             listener.enterOrExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitOrExpression) {
             listener.exitOrExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitOrExpression) {
            return visitor.visitOrExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AndExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterAndExpression) {
             listener.enterAndExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitAndExpression) {
             listener.exitAndExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitAndExpression) {
            return visitor.visitAndExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MembershipExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterMembershipExpression) {
             listener.enterMembershipExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitMembershipExpression) {
             listener.exitMembershipExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitMembershipExpression) {
            return visitor.visitMembershipExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class InequalityExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterInequalityExpression) {
             listener.enterInequalityExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitInequalityExpression) {
             listener.exitInequalityExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitInequalityExpression) {
            return visitor.visitInequalityExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class InvocationExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public invocation(): InvocationContext {
        return this.getRuleContext(0, InvocationContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterInvocationExpression) {
             listener.enterInvocationExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitInvocationExpression) {
             listener.exitInvocationExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitInvocationExpression) {
            return visitor.visitInvocationExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class EqualityExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterEqualityExpression) {
             listener.enterEqualityExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitEqualityExpression) {
             listener.exitEqualityExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitEqualityExpression) {
            return visitor.visitEqualityExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ImpliesExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterImpliesExpression) {
             listener.enterImpliesExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitImpliesExpression) {
             listener.exitImpliesExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitImpliesExpression) {
            return visitor.visitImpliesExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TermExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public term(): TermContext {
        return this.getRuleContext(0, TermContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterTermExpression) {
             listener.enterTermExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitTermExpression) {
             listener.exitTermExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitTermExpression) {
            return visitor.visitTermExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class TypeExpressionContext extends ExpressionContext {
    public constructor(ctx: ExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public typeSpecifier(): TypeSpecifierContext {
        return this.getRuleContext(0, TypeSpecifierContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterTypeExpression) {
             listener.enterTypeExpression(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitTypeExpression) {
             listener.exitTypeExpression(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitTypeExpression) {
            return visitor.visitTypeExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TermContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_term;
    }
    public override copyFrom(ctx: TermContext): void {
        super.copyFrom(ctx);
    }
}
export class ExternalConstantTermContext extends TermContext {
    public constructor(ctx: TermContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public externalConstant(): ExternalConstantContext {
        return this.getRuleContext(0, ExternalConstantContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterExternalConstantTerm) {
             listener.enterExternalConstantTerm(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitExternalConstantTerm) {
             listener.exitExternalConstantTerm(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitExternalConstantTerm) {
            return visitor.visitExternalConstantTerm(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LiteralTermContext extends TermContext {
    public constructor(ctx: TermContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public literal(): LiteralContext {
        return this.getRuleContext(0, LiteralContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterLiteralTerm) {
             listener.enterLiteralTerm(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitLiteralTerm) {
             listener.exitLiteralTerm(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitLiteralTerm) {
            return visitor.visitLiteralTerm(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ParenthesizedTermContext extends TermContext {
    public constructor(ctx: TermContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterParenthesizedTerm) {
             listener.enterParenthesizedTerm(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitParenthesizedTerm) {
             listener.exitParenthesizedTerm(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitParenthesizedTerm) {
            return visitor.visitParenthesizedTerm(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class InvocationTermContext extends TermContext {
    public constructor(ctx: TermContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public invocation(): InvocationContext {
        return this.getRuleContext(0, InvocationContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterInvocationTerm) {
             listener.enterInvocationTerm(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitInvocationTerm) {
             listener.exitInvocationTerm(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitInvocationTerm) {
            return visitor.visitInvocationTerm(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_literal;
    }
    public override copyFrom(ctx: LiteralContext): void {
        super.copyFrom(ctx);
    }
}
export class TimeLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TIME(): antlr.TerminalNode {
        return this.getToken(fhirpathParser.TIME, 0)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterTimeLiteral) {
             listener.enterTimeLiteral(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitTimeLiteral) {
             listener.exitTimeLiteral(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitTimeLiteral) {
            return visitor.visitTimeLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NullLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterNullLiteral) {
             listener.enterNullLiteral(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitNullLiteral) {
             listener.exitNullLiteral(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitNullLiteral) {
            return visitor.visitNullLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DateTimeLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DATETIME(): antlr.TerminalNode {
        return this.getToken(fhirpathParser.DATETIME, 0)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterDateTimeLiteral) {
             listener.enterDateTimeLiteral(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitDateTimeLiteral) {
             listener.exitDateTimeLiteral(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitDateTimeLiteral) {
            return visitor.visitDateTimeLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class StringLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(fhirpathParser.STRING, 0)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterStringLiteral) {
             listener.enterStringLiteral(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitStringLiteral) {
             listener.exitStringLiteral(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitStringLiteral) {
            return visitor.visitStringLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class DateLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DATE(): antlr.TerminalNode {
        return this.getToken(fhirpathParser.DATE, 0)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterDateLiteral) {
             listener.enterDateLiteral(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitDateLiteral) {
             listener.exitDateLiteral(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitDateLiteral) {
            return visitor.visitDateLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class BooleanLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterBooleanLiteral) {
             listener.enterBooleanLiteral(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitBooleanLiteral) {
             listener.exitBooleanLiteral(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitBooleanLiteral) {
            return visitor.visitBooleanLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class NumberLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(fhirpathParser.NUMBER, 0)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterNumberLiteral) {
             listener.enterNumberLiteral(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitNumberLiteral) {
             listener.exitNumberLiteral(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitNumberLiteral) {
            return visitor.visitNumberLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class LongNumberLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LONGNUMBER(): antlr.TerminalNode {
        return this.getToken(fhirpathParser.LONGNUMBER, 0)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterLongNumberLiteral) {
             listener.enterLongNumberLiteral(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitLongNumberLiteral) {
             listener.exitLongNumberLiteral(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitLongNumberLiteral) {
            return visitor.visitLongNumberLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class QuantityLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public quantity(): QuantityContext {
        return this.getRuleContext(0, QuantityContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterQuantityLiteral) {
             listener.enterQuantityLiteral(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitQuantityLiteral) {
             listener.exitQuantityLiteral(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitQuantityLiteral) {
            return visitor.visitQuantityLiteral(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExternalConstantContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(fhirpathParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_externalConstant;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterExternalConstant) {
             listener.enterExternalConstant(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitExternalConstant) {
             listener.exitExternalConstant(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitExternalConstant) {
            return visitor.visitExternalConstant(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class InvocationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_invocation;
    }
    public override copyFrom(ctx: InvocationContext): void {
        super.copyFrom(ctx);
    }
}
export class TotalInvocationContext extends InvocationContext {
    public constructor(ctx: InvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterTotalInvocation) {
             listener.enterTotalInvocation(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitTotalInvocation) {
             listener.exitTotalInvocation(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitTotalInvocation) {
            return visitor.visitTotalInvocation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ThisInvocationContext extends InvocationContext {
    public constructor(ctx: InvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterThisInvocation) {
             listener.enterThisInvocation(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitThisInvocation) {
             listener.exitThisInvocation(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitThisInvocation) {
            return visitor.visitThisInvocation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class IndexInvocationContext extends InvocationContext {
    public constructor(ctx: InvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterIndexInvocation) {
             listener.enterIndexInvocation(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitIndexInvocation) {
             listener.exitIndexInvocation(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitIndexInvocation) {
            return visitor.visitIndexInvocation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class FunctionInvocationContext extends InvocationContext {
    public constructor(ctx: InvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public function(): FunctionContext {
        return this.getRuleContext(0, FunctionContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterFunctionInvocation) {
             listener.enterFunctionInvocation(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitFunctionInvocation) {
             listener.exitFunctionInvocation(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitFunctionInvocation) {
            return visitor.visitFunctionInvocation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MemberInvocationContext extends InvocationContext {
    public constructor(ctx: InvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterMemberInvocation) {
             listener.enterMemberInvocation(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitMemberInvocation) {
             listener.exitMemberInvocation(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitMemberInvocation) {
            return visitor.visitMemberInvocation(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public paramList(): ParamListContext | null {
        return this.getRuleContext(0, ParamListContext);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_function;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterFunction) {
             listener.enterFunction(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitFunction) {
             listener.exitFunction(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitFunction) {
            return visitor.visitFunction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParamListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_paramList;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterParamList) {
             listener.enterParamList(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitParamList) {
             listener.exitParamList(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitParamList) {
            return visitor.visitParamList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class QuantityContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NUMBER(): antlr.TerminalNode {
        return this.getToken(fhirpathParser.NUMBER, 0)!;
    }
    public unit(): UnitContext | null {
        return this.getRuleContext(0, UnitContext);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_quantity;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterQuantity) {
             listener.enterQuantity(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitQuantity) {
             listener.exitQuantity(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitQuantity) {
            return visitor.visitQuantity(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UnitContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public dateTimePrecision(): DateTimePrecisionContext | null {
        return this.getRuleContext(0, DateTimePrecisionContext);
    }
    public pluralDateTimePrecision(): PluralDateTimePrecisionContext | null {
        return this.getRuleContext(0, PluralDateTimePrecisionContext);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(fhirpathParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_unit;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterUnit) {
             listener.enterUnit(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitUnit) {
             listener.exitUnit(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitUnit) {
            return visitor.visitUnit(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DateTimePrecisionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_dateTimePrecision;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterDateTimePrecision) {
             listener.enterDateTimePrecision(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitDateTimePrecision) {
             listener.exitDateTimePrecision(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitDateTimePrecision) {
            return visitor.visitDateTimePrecision(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PluralDateTimePrecisionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_pluralDateTimePrecision;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterPluralDateTimePrecision) {
             listener.enterPluralDateTimePrecision(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitPluralDateTimePrecision) {
             listener.exitPluralDateTimePrecision(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitPluralDateTimePrecision) {
            return visitor.visitPluralDateTimePrecision(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TypeSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext {
        return this.getRuleContext(0, QualifiedIdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_typeSpecifier;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterTypeSpecifier) {
             listener.enterTypeSpecifier(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitTypeSpecifier) {
             listener.exitTypeSpecifier(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitTypeSpecifier) {
            return visitor.visitTypeSpecifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class QualifiedIdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_qualifiedIdentifier;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterQualifiedIdentifier) {
             listener.enterQualifiedIdentifier(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitQualifiedIdentifier) {
             listener.exitQualifiedIdentifier(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitQualifiedIdentifier) {
            return visitor.visitQualifiedIdentifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(fhirpathParser.IDENTIFIER, 0);
    }
    public DELIMITEDIDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(fhirpathParser.DELIMITEDIDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return fhirpathParser.RULE_identifier;
    }
    public override enterRule(listener: fhirpathListener): void {
        if(listener.enterIdentifier) {
             listener.enterIdentifier(this);
        }
    }
    public override exitRule(listener: fhirpathListener): void {
        if(listener.exitIdentifier) {
             listener.exitIdentifier(this);
        }
    }
    public override accept<Result>(visitor: fhirpathVisitor<Result>): Result | null {
        if (visitor.visitIdentifier) {
            return visitor.visitIdentifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
