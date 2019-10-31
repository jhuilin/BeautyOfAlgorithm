import React, { Component } from "react";

class Navigator extends Component {
  state = {};
  render() {
    return (
      <div class="container my-0">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <button type="button" class="btn btn-outline-primary">
              Bubble Sort
            </button>
            <button type="button" class="btn btn-outline-secondary">
              Selection Sort
            </button>
            <button type="button" class="btn btn-outline-success">
              Insertion Sort
            </button>
            <button type="button" class="btn btn-outline-danger">
              Quick Sort
            </button>
            <button type="button" class="btn btn-outline-warning">
              Radix Sort
            </button>
            <button type="button" class="btn btn-outline-info">
              Merge Sort
            </button>
            <button type="button" class="btn btn-outline-dark">
              Binary insertion Sort
            </button>
            <button type="button" class="btn btn-outline-primary">
              heap Sort
            </button>
            <button type="button" class="btn btn-outline-success">
              Shell Sort
            </button>
            <button type="button" class="btn btn-outline-danger">
              Bucket Sort
            </button>
            <button type="button" class="btn btn-outline-warning">
              Counting Sort
            </button>
            <button type="button" class="btn btn-outline-info">
              Tim Sort
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigator;
