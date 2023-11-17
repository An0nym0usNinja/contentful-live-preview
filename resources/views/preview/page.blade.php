<x-guest-layout>
    @section('head')
        <script type="text/javascript">
            let entryId = "{{ $entryId }}";
            let spaceId = "{{ env('CONTENTFUL_SPACE_ID') }}";
            let accessToken = "{{ env('CONTENTFUL_ACCESS_TOKEN') }}";
        </script>
        @vite('resources/js/live-preview.js')
    @endsection

    <h1 class="h1" data-contentful-entry-id="{{ $entryId }}" data-contentful-field-id="title"></h1>
    <h1 class="h1" data-contentful-entry-id="{{ $entryId }}" data-contentful-field-id="slug"></h1>
    <h1 class="h1" data-contentful-entry-id="{{ $entryId }}" data-contentful-field-id="content"></h1>
</x-guest-layout>
