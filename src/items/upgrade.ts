class Upgrade {
  public name: string;
  public cost: number;
  public number: number;
  
  constructor( name: string, cost: number, amount: number) { 
    this.name = name;
    this.cost = cost;
    this.number = amount;
  }
}