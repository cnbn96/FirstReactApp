import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchChampion from './fetchChampion';
import youtubeSearch from './youtubeSearch';

class Stat extends React.Component{
  render(){
    return (
      <p>
        <span className={"stat-label "+this.props.statClass}>{this.props.statName}:</span>
        <span className="stat-value"><span className="dd-auto-set" data-property="stats.hp">{this.props.statValue}</span>&nbsp;
        { 
          this.props.statPerLevel !== undefined && <span>(+<span className="dd-auto-set">{this.props.statPerLevel}</span> per level)</span>
        }
        </span> 
      </p>
    );
  }
}
class SpotLight extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      youtubeCode: ''
    };
  }
  componentWillMount(){
    console.log('SpotLight DidMount!');
    youtubeSearch(this.props.champName, youtube => 
      this.setState({youtubeCode: youtube})
    );
  }
  render(){
    return(
      <iframe id="ChampionSpotlightVideo" width="450" height="253" src={'https://www.youtube.com/embed/0gvBGmwhOLU?wmode=transparent'} frameBorder="0" allowFullScreen=""></iframe>
    );
  }
}
class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champion: []
    };
  }
  componentWillMount(){
    console.log("Champion DidMount Running!");
    fetchChampion(this.props.id, champion => 
      this.setState({champion: champion})
    );
  }
  render() {
    return (
      <div className="main-page">
        <div id="ChampionBackdrop" style={{"backgroundImage": "url(https://lolstatic-a.akamaihd.net/game-info/1.1.9/images/champion/backdrop/bg-irelia.jpg)", "opacity": "1"}}></div>
        <div className="section" id="champion-section">
          <div className="container">
            <div className="row" id="champ-row">
              <div className="col-xs-12 col-md-6 champ-info">
                <div className="content-border">
                  <div className="white-stone">
                    <div className="row">
                      <div className="col-xs-12 col-md-4 champ-avatar">
                        <img className="dd-set-image-champion-icon" src={'https://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/' + this.state.champion.name + ".png"} alt={this.state.champion.name}/> 
                      </div>
                      <div className="col-xs-12 col-md-8 champ-name-box">
                        <h3 className="champ-name">{this.state.champion.name}</h3>
                        <span className="champ-title" data-property="title">{this.state.champion.title}</span>
                        <p className="champ-lore">{this.state.champion.lore}</p>
                      </div>
                    </div>
                  </div>
                  <div className="white-stone">
                    <div className="row">
                      <div className="col-xs-12 col-md-6">
                        <div className="champ-stat-box">
                          <Stat statName={'Health'} statValue={this.state.champion.stats && this.state.champion.stats['hp']} statPerLevel={this.state.champion.stats && this.state.champion.stats['hpregenperlevel']} statClass={'stat-hp'}/>
                          <Stat statName={'Attack Damage'} statValue={this.state.champion.stats && this.state.champion.stats['attackdamage']} statPerLevel={this.state.champion.stats && this.state.champion.stats['attackdamageperlevel']} statClass={'stat-ad'}/>
                          <Stat statName={'Attack Speed'} statValue={this.state.champion.stats && this.state.champion.stats['attackspeedoffset']} statPerLevel={this.state.champion.stats && this.state.champion.stats['attackspeedperlevel']} statClass={'stat-as'}/>
                          <Stat statName={'Movement Speed'} statValue={this.state.champion.stats && this.state.champion.stats['movespeed']} statClass={'stat-ms'}/>
                        </div>
                      </div>
                      <div className="col-xs-12 col-md-6">
                        <div className="champstat-box">
                          <Stat statName={'Health Regen'} statValue={this.state.champion.stats && this.state.champion.stats['hpregen']} statPerLevel={this.state.champion.stats && this.state.champion.stats['hpregenperlevel']} statClass={'stat-hp-regen'}/>
                          <Stat statName={'Armor'} statValue={this.state.champion.stats && this.state.champion.stats['armor']} statPerLevel={this.state.champion.stats && this.state.champion.stats['armorperlevel']} statClass={'stat-armor'}/>
                          <Stat statName={'Magic Resist'} statValue={this.state.champion.stats && this.state.champion.stats['spellblock']} statPerLevel={this.state.champion.stats && this.state.champion.stats['spellblockperlevel']} statClass={'stat-mr'}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-6 champ-ability">
                <div id="ChampionSpotlightContainer" className="content-border">
                  <SpotLight champName={this.state.champion.name} />
                </div>
                <h3 style={{marginBottom : "10px"}}>Abilities</h3>
                <div id="ability-summary" className="gs-container no-vertical-gutter">
                  <div className="default-1-5">
                    <span className="content-border"><a href="#SpellP"><img className="dd-set-image-ability-P" src="https://ddragon.leagueoflegends.com/cdn/8.11.1/img/passive/Irelia_Passive.png"/></a></span>
                  </div>
                  <div className="default-1-5">
                   <span className="content-border"><a href="#SpellQ"><img className="dd-set-image-ability-Q" src="https://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/IreliaQ.png"/></a></span>
                  </div>
                  <div className="default-1-5">
                    <span className="content-border"><a href="#SpellW"><img className="dd-set-image-ability-W" src="https://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/IreliaW.png"/></a></span>
                  </div>
                  <div className="default-1-5">
                    <span className="content-border"><a href="#SpellE"><img className="dd-set-image-ability-E" src="https://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/IreliaE.png"/></a></span>
                  </div>
                  <div className="default-1-5">
                    <span className="content-border"><a href="#SpellR">
                       <img className="dd-set-image-ability-R" src="https://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/IreliaR.png"/></a></span>
                  </div>
                </div>
                <a id="UniverseLink" href="https://universe.leagueoflegends.com/en_US/champion/irelia" className="btn-large btn-large-primary" style={{"width":"100%"}}>Learn about Irelia on Universe</a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <Champion id={75} />
      </div>
    );
  }
}

export default App;
