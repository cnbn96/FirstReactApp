import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchChampion from './fetchChampion';

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

class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champion:{} 
    };
  }
  componentDidMount(){
    console.log("DidMount Running");
    fetchChampion(this.props.id, champion => 
      this.setState({champion})
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
                          {
                            this.state.champion.stats.map(obj => 
                              obj.hp
                            )
                          }
                          <Stat statName={'Health'} statValue={80} statPerLevel={85} statClass={'stat-hp'}/>
                          <Stat statName={'Attack Damage'} statValue={80} statPerLevel={85} statClass={'stat-ad'}/>
                          <p>
                            <span className="stat-label stat-as">Attack Speed:</span><span className="stat-value"><span className="dd-auto-set" data-property="stats.attackspeed"></span>&nbsp;(+
                            <span
                             className="dd-auto-set" data-property="stats.attackspeedperlevel">2.5</span>%&nbsp;per level)</span>
                          </p>
                          <p>
                            <span className="stat-label stat-ms">Movement Speed:</span><span className="stat-value">&nbsp;<span className="dd-auto-set" data-property="stats.movespeed"></span></span>
                          </p>
                        </div>
                      </div>
                      <div className="col-xs-12 col-md-6">
                        <div className="champstat-box">
                          <p><span className="stat-label stat-hp-regen">Health Regen:</span><span className="stat-value"><span className="dd-auto-set" data-property="stats.hpregen">8.5</span>&nbsp;(+
                          <span
                           className="dd-auto-set" data-property="stats.hpregenperlevel">0.85</span>&nbsp;per level)</span>
                          </p>
                          <p><span className="stat-label stat-armor">Armor:</span><span className="stat-value"><span className="dd-auto-set" data-property="stats.armor">34</span>&nbsp;(+
                            <span
                             className="dd-auto-set" data-property="stats.armorperlevel">3</span>&nbsp;per level)</span>
                          </p>
                          <p><span className="stat-label stat-mr">Magic Resist:</span><span className="stat-value"><span className="dd-auto-set" data-property="stats.spellblock">32</span>&nbsp;(+
                            <span
                             className="dd-auto-set" data-property="stats.spellblockperlevel">1.25</span>&nbsp;per level)</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-6 champ-ability">
                <div id="ChampionSpotlightContainer" className="content-border">
                  <iframe id="ChampionSpotlightVideo" width="450" height="253" src="https://www.youtube.com/embed/MFcsOX9xcIo?wmode=transparent"
                  frameBorder="0" allowFullScreen=""></iframe>
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
        <Champion id={266} />
      </div>
    );
  }
}

export default App;
