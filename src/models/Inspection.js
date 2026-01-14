export class Inspection {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.location = data.location
    this.inspector = data.inspector
    this.status = data.status
    this.inspectionDate = data.inspectionDate
    this.score = data.score
  }
}
