// This example demonstrates the definition and initialization of a "struct" in Leo.
program rock_paper_scissors_3lzgy5.aleo {
    // The "Message" struct.
    struct Message {
        first: field,
 
        second: field,
    }
    transition main(m: Message) -> field {

        let m1: Message = Message {
            first: m.first,
            second: m.second,
        };


        //바위 0 
        //가위 2
        //보 5 

        //m1이 바위일 때
        //바위랑 가위 > 바위 승  
        if(m1.first == 0field && m1.second == 2field){
          return m1.first;
        }

        //m1이 바위일 때
        //바위랑 보 > 보 승 
        if(m1.first == 0field && m1.second == 5field){
          return m1.second;
        }

        //m1이 바위일 때
        //바위랑 바위 > 무승부 
        if(m1.first == 0field && m1.second == 0field){
          return 10field;
        }

        //m1이 가위일 때 
        //가위랑 바위 > 바위 승 
        if(m1.first == 2field && m1.second == 0field){
          return m1.second; 
        }

        //m1이 가위일 때 
        //가위랑 보 > 가위 승 
        if(m1.first == 2field && m1.second == 5field){
          return m1.first;
        }

         //m1이 가위일 때 
        //가위랑 가위일 때 무승부 
        if(m1.first == 2field && m1.second == 2field){
          return 10field;
        }

        //m1이 보일 때
        //보랑 가위일 때
        if(m1.first == 5field && m1.second == 2field){
          return m1.second;
        }

        //m1이 보일 때
        //보랑 바위일 때
        if(m1.first == 5field && m1.second == 0field){
          return m1.first; 
        }

        //보랑 보일 때 
        if(m1.first == 5field && m1.second == 5field)
        {
          return 10field;
        }
    return m1.first + m1.second;
  }
    
}