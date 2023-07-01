import java.util.*;
import java.io.*;

public class DictionaryParser {
   public static void main(String[] args) throws FileNotFoundException {

      // open input file and count character frequencies
      Scanner input = new Scanner(new File("longdict.txt"));
      PrintStream output = new PrintStream(new File("newdict.txt"));
      while (input.hasNextLine()) {
         String word = input.nextLine();
         
         if (!(word.length() < 4)) {
            output.println(word);
         }        
      }
   }

}