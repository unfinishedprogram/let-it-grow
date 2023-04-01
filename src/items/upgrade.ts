class Upgrade {
  public name: string;
  public number: number;
  
  constructor( name: string, amount: number) { 
    this.name = name;
    this.number = amount;
  }
}

export default Upgrade;