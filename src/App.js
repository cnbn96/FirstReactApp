import React, { Component } from 'react';
import './App.css';
import fetchChampion from './fetchChampion';
import youtubeSearch from './youtubeSearch';

class UniverseLink extends React.Component{
 render(){
  return(
    <a 
      id="UniverseLink" 
      href={"https://universe.leagueoflegends.com/en_US/champion/"+this.props.champName} 
      className="btn-large btn-large-primary" 
      style={{"width":"100%"}}>Learn about {this.props.champName} on Universe</a> 
  );
 } 
}
class Ability extends React.Component{
  getSpellLink(spellKey, spellImage){
    let spellLink = spellKey !== 'P'?('https://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/'+spellImage):'https://ddragon.leagueoflegends.com/cdn/8.11.1/img/passive/'+spellImage;
    return spellLink;
  }
  componentDidUpdate(){    
    window.$('.tooltip-spell').tooltipster({
       animation: 'fade',
       delay: 200,
       theme: 'tooltipster-punk',
       contentCloning: true
    });
  }
  render(){
    return(
      <div className="default-1-5">
        <span className="content-border">
          <a className="tooltip-spell" href={"#Spell"+this.props.spellKey} data-tooltip-content={"#tooltip-spell-"+this.props.spellKey}>
          <img className={"dd-set-image-ability-"+this.props.spellKey} src={this.getSpellLink(this.props.spellKey,this.props.spellImage)}/>
          </a>
        </span>
        <div className="tooltip_templates">
          <span id={"tooltip-spell-"+this.props.spellKey}>
              <span className="spell-name">{this.props.spellName}</span> 
              <i className="spell-description">{this.props.spellDescription}</i> 
          </span>
        </div>
      </div>
    );
  }
}
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
      youtube: ''
    };
  }
  componentDidMount(){
    youtubeSearch(this.props.champName, youtube => 
      this.setState({youtube})
    );
  }
  render(){
    let youtubeCode = this.state.youtube.items && this.state.youtube.items[0].id.videoId;
    return(
      <iframe id="ChampionSpotlightVideo" width="450" height="253" src={`https://www.youtube.com/embed/${youtubeCode}?wmode=transparent`} frameBorder="0" allowFullScreen=""></iframe>
    );
  }
}
class ChampionAvatar extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <img className="dd-set-image-champion-icon" src={`https://ddragon.leagueoflegends.com/cdn/8.11.1/img/champion/${this.props.champAvatarFileName}`} alt={this.props.champName}/> 
    );
  }
}
class ChampionInfo extends React.Component{

}
class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champion: []
    };
  }
  componentDidMount(){
    fetchChampion(this.props.id, champion => 
      this.setState({champion: champion})
    );
  }
  render() {
    return (
      <div className="main-page">
        <div id="ChampionBackdrop" style={{"backgroundImage": `url(https://lolstatic-a.akamaihd.net/game-info/1.1.9/images/champion/backdrop/bg-${this.state.champion.name && this.state.champion.name.toLowerCase()}.jpg)`, "opacity": "1"}}></div>
        <div className="section" id="champion-section">
          <div className="container">
            <div className="row" id="champ-row">
              <div className="col-xs-12 col-md-6 champ-info">
                <div className="content-border">
                  <div className="white-stone">
                    <div className="row">
                      <div className="col-xs-12 col-md-4 champ-avatar">
                        <ChampionAvatar champName={this.state.champion.name} champAvatarFileName={this.state.champion.image && this.state.champion.image.full} />
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
                  {this.state.champion.name && <SpotLight champName={this.state.champion.name} />}
                </div>
                <h3 style={{marginBottom : "10px"}}>Abilities</h3>
                <div id="ability-summary" className="gs-container no-vertical-gutter">
                  <Ability 
                    spellKey={"P"} 
                    spellImage={this.state.champion.passive && this.state.champion.passive['image']['full']} 
                    spellName={this.state.champion.passive && this.state.champion.passive['name']} 
                    spellDescription={this.state.champion.passive && this.state.champion.passive['description']} 
                  />
                  <Ability 
                    spellKey={"Q"} 
                    spellImage={this.state.champion.spells && this.state.champion.spells[0].image.full}
                    spellName={this.state.champion.spells && this.state.champion.spells[0].name}
                    spellDescription={this.state.champion.spells && this.state.champion.spells[0].description}
                  />
                  <Ability 
                    spellKey={"W"} 
                    spellImage={this.state.champion.spells && this.state.champion.spells[1].image.full}
                    spellName={this.state.champion.spells && this.state.champion.spells[1].name}
                    spellDescription={this.state.champion.spells && this.state.champion.spells[1].description}
                  />
                  <Ability 
                    spellKey={"E"} 
                    spellImage={this.state.champion.spells && this.state.champion.spells[2].image.full}
                    spellName={this.state.champion.spells && this.state.champion.spells[2].name}
                    spellDescription={this.state.champion.spells && this.state.champion.spells[2].description}
                  />
                  <Ability 
                    spellKey={"R"} 
                    spellImage={this.state.champion.spells && this.state.champion.spells[3].image.full}
                    spellName={this.state.champion.spells && this.state.champion.spells[3].name}
                    spellDescription={this.state.champion.spells && this.state.champion.spells[3].description}
                  />
                </div>
                <UniverseLink champName={this.state.champion.name}/>
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
