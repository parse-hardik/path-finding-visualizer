export default class Queue{
  constructor(){
    this.items = [];
  }

  push(data){
    this.items.push(data)
  }

  isEmpty(){
    return this.items.length === 0;
  }

  front(){
    return this.items[0];
  }

  pop(){
    if(this.items.length>0)
      this.items.shift();
  }
}