import csvParser from 'csv-parser';

async function parseCsvString(csvString: string): Promise<any[]> {
    const results: any = [];
  
    return new Promise((resolve, reject) => {
      csvParser()
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err))
        .write(csvString);
    });
  }

  export default parseCsvString;
