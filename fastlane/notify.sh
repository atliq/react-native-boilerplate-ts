while getopts ":j:u:" opt; do
  case $opt in
    j) json="$OPTARG"
    ;;
    u) url="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    exit 1
    ;;
  esac

  case $OPTARG in
    -*) echo "Option $opt needs a valid argument"
    exit 1
    ;;
  esac
done

curl --location "$url" \
--header 'Content-Type: application/json' \
--data-raw "$json"

