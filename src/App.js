import React from 'react';
import analyze from './wordanalyzer.js';
import './App.css';

export default class App extends React.PureComponent {
    state = {
        story: '',
        analysis: {}
    };

    setStory = (e) => {
        this.setState({
            story: e.target.value,
            analysis: analyze(e.target.value)
        });
    };

    render() {
        const {grade, words, sentences, adverbs, adverbPercentage} = this.state.analysis;
        return (<div>
            <textarea value={this.state.story} onChange={this.setStory} />
            <ul>
                <li>Grade Level: {grade}</li>
                <li>Sentence count: {sentences}</li>
                <li>Word count: {words}</li>
                <li>Adverb count: {adverbs}</li>
                <li>Adverb percentage: {adverbPercentage}</li>
            </ul>
        </div>);
    }
}

