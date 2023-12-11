@extends(getTemplate().'.view.layout.layout')
@section('page')
<div class="h-20"></div>
<div class="container-fluid">
    <div class="row">
        <div class="container">
            <div class="col-md-12 ">
                <div class="newest-container newest-container-s">
                    <div class="row body ">
                        @foreach($new_devices as $i=>$device)
                        <div class="col-md-4 col-sm-6 col-xs-12 " style="float: left !important;">
                            <a href="{{url('/device/'.$device->slug)}}" {{--                                        href="#spot{{ $i }}" id="{{ $i }}" --}} {{--                                       data-toggle="modal"--}} {{--                                       data-target="#spot{{ $i }}" title="{{ $device->title }}" --}} class="content-box pagi-content-box h-device">

                                <div class="img-container">
                                    {{-- <model-viewer style="width: 100%;" src="{{ url('media/'.$device->file) }}"--}}
                                    {{-- alt="{!! truncate($device->title,30) !!}" auto-rotate--}}
                                    {{-- camera-controls autoplay ar--}}
                                    {{-- shadow-intensity="1"></model-viewer>--}}
                                    @if(strtolower(pathinfo($device->file)['extension']) != 'glb' AND strtolower(pathinfo($device->file)['extension']) != 'fbx')
                                    <div>
                                        <img style="object-fit: cover" class="img-responsive" src="{{ url('media/'.$device->file) }}" alt="{!! truncate($device->title,30) !!}">
                                    </div>
                                    @else
                                    <section style="height: 155px" id="modelViewerContainer{{$device->id}}"></section>
                                    @endif

                                </div>
                                <h3>{!! truncate($device->title,35) !!}</h3>
                            </a>
                        </div>
                        <div class="modal" id="spot{{ $i }}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;
                                        </button>
                                        <h4 class="modal-title" id="myModalLabel">{!! truncate($device->title,30) !!}</h4>
                                    </div>
                                    <div class="modal-body">
                                        <model-viewer style="width: 100%; height: 400px" src="{{ url($device->file) }}" alt="{!! truncate($device->title,30) !!}" auto-rotate camera-controls autoplay ar shadow-intensity="1"></model-viewer>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
            <div class="text-center">
                <div class="pagi text-center center-block col-xs-12 light-theme simple-pagination">
                    <ul>
                        @if($new_devices->previousPageUrl()!=null)
                        <li class="disabled">
                            <span class="current prev">
                                <a style=" padding: unset !important;font-size:unset !important;color: white !important;" href="{{$new_devices->previousPageUrl()}}">
                                    Pre
                                </a>
                            </span>
                        </li>
                        @endif
                        <li class="active"><span class="current">{{$new_devices->currentPage()}}</span></li>
                        @if($new_devices->nextPageUrl()!=null)
                        <li class="disabled"><span class="current next">
                                <a style=" padding: unset !important;font-size:unset !important;color: white !important;" href="{{$new_devices->nextPageUrl()}}">
                                    Next
                                </a>
                            </span></li>
                        @endif
                    </ul>
                </div>
                {{-- @php dd(get_class_methods($new_devices)) @endphp--}}
                {{-- @php dd($new_devices->currentPage(),$new_devices->nextPageUrl(),$new_devices->previousPageUrl()) @endphp--}}
                {{-- {{ $new_devices->links('pagination.default') }}--}}
            </div>
        </div>
    </div>
</div>
<!--   <script>
        @foreach($new_devices as $i=>$device)
        @php if(strtolower(pathinfo($device->file)['extension']) != 'glb' AND strtolower(pathinfo($device->file)['extension']) != 'fbx'){
            continue;
        }
        @endphp
        let configObject{!! $device->id !!} = {
            backgroundGradient: false,
            containerId: 'modelViewerContainer{!! $device->id !!}',
            helpButton: false,
        };

        let modelViewer{!! $device->id !!}  = new ModelViewer(configObject{!! $device->id !!});

        modelViewer{!! $device->id !!}.initialize('/media/' + '{!!$device->file!!}', () => {
            console.log("Model loaded")
        });
        @endforeach
    </script>-->
@endsection
